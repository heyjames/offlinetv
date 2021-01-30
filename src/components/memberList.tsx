import React, { useState, useEffect } from 'react';
import { pause, mySort } from '../utils';
import { getMembers } from '../services/memberService';
import { getMyAPI } from '../services/twitchService';
import Refresh from './refresh';
import Loading from './loading';
// import _ from 'lodash';
import Avatar from './avatar';
import Name from './name';
import Channel from './channel';
import StreamTimeControl from './streamTimeControl';

interface Member {
  alias: string;
  name: string;
  stream: {
    id: string;
    label: string;
    url: string;
    live: boolean;
    url_alt: string;
    avatar: string;
    last_stream_date: string;
  },
  api: {
    viewers?: number;
    game?: string;
    stream_started_at?: string;
    title?: string;
    logo?: string;
  },
  links: string[]
}

interface Notification {
  level?: string;
  message?: string;
}

export interface MemberListProps {
}
 
export interface MemberListState {
  loading: boolean,
  refreshing: boolean,
  members: Member[],
  notification: Notification
}

function MemberList() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [notification, setNotification] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    (async () => {
      let INTERVAL_ID: any = null;
      clearInterval(INTERVAL_ID);

      const members = await getAndSortMembers(setNotification);
      setMembers(members);

      setLoading(false);

      INTERVAL_ID = setInterval(async () => {
        setRefreshing(true);

        await pause(3000);
        const members = await getAndSortMembers(setNotification);
        setMembers(members);

        setRefreshing(false);
      }, 60000);

      return function cleanup() {
        clearInterval(INTERVAL_ID);
      }
    })();
  }, [setMembers, setRefreshing, setLoading]);

  return (
    <div className="content">
      <div className="notification">
        <div className="message">
          {renderNotification(notification)}
        </div>
        { (!loading && refreshing) && <Refresh refreshing={refreshing}/> }
      </div>

      <Loading loading={loading}>
        {members.map((member: Member, index) => {
          const { stream, api } = member;
          const { live, last_stream_date: lastStreamedAt, label } = stream;
          const { title, stream_started_at: streamStartedAt } = api;
          const isFB = (label.toLowerCase() === "facebook");

          return (
            <Channel key={index} member={member}>
              <Avatar member={member}>
                {/* <div className="avatar-ring"></div> */}
                <img
                  className={stream.label.toLowerCase()}
                  src={api.logo || "/avatars/" + stream.avatar}
                  alt={member.alias.charAt(0)}
                />
              </Avatar>
            
              <div className="details">
                <div className="ng">
                  <Name member={member} />
                  <div className="game">
                    {live && api.game}
                  </div>
                </div>
                
                <div className="stream-title-p">
                  <div className="stream-title" title={title}>
                    {live && title}
                  </div>
                </div>

                <div className="view-count-p">
                  {
                    isFB && (<div>
                    <i 
                      className="fas fa-exclamation-triangle unsupported-platform-icon"
                      title="Facebook Gaming is unsupported"
                    ></i>
                    </div>)
                  }
                  <div className="view-count">
                    {live && (api.viewers && api.viewers.toLocaleString())}
                  </div>
                  <StreamTimeControl
                    streamStartedAt={streamStartedAt}
                    lastStreamedAt={lastStreamedAt}
                    live={live}
                  />
                </div>
              </div>
            </Channel>
          );
        })}
      </Loading>
    </div>
  );
}

async function getAndSortMembers(setNotification: any) {
  try {
    let { data: members } = await getMyAPI();
    members = sortMembers(members, true);
    setNotification({});
    return members;
  } catch (error) {
    console.error("A network error has occurred. Falling back to offline (^_^) mode.");
    let members: any = await getMembers();
    members = sortMembers(members, false);
    setNotification({ level: "high", message: "Network error. Try reloading."});
    return members;
  }
}

function renderNotification(notification: Notification) {
  const { level, message } = notification;
  
  let iconClass = "";
  let color = "";

  if (level === "moderate") {
    iconClass = "fas fa-exclamation-triangle";
    color = "yellow";
  }

  if (level === "high") {
    iconClass = "fas fa-exclamation-circle";
    color = "red";
  }

  return (
    <React.Fragment>
      <i
        style={{ color }}
        id="notification-icon"
        className={iconClass}
        title={message}
      ></i> {message}
    </React.Fragment>
  );
}

function sortMembers(members: Member[], online: boolean): Member[] {
  let isLive: Member[] = [];
  let notLiveNoLastSeen: Member[] = [];
  let notLivehasLastSeen: Member[] = [];

  // Get online members and sort by descending view count.
  if (online) {
    isLive = members.filter((member: Member) => member.stream.live === true);
    if (isLive.length > 1) mySort(isLive, "api", "viewers");
  }

  // Get offline members and sort by ascending alias.
  notLiveNoLastSeen = members.filter((member: Member) => {
    return member.stream.live === false && member.stream.last_stream_date === "";
  });
  notLiveNoLastSeen.sort((a, b) => {
    return (a.alias.toLowerCase() > b.alias.toLowerCase()) ? 1 : -1;
  });

  // Get offline members with a "last seen" date and sort by ascending age.
  notLivehasLastSeen = members.filter((member: Member) => {
    return member.stream.live === false && member.stream.last_stream_date !== "";
  });
  notLivehasLastSeen.sort((a, b) => {
    const compareA = new Date(a.stream.last_stream_date).getTime();
    const compareB = new Date(b.stream.last_stream_date).getTime();
    return (compareB < compareA) ? -1 : 1;
  });
  
  
  return [...isLive, ...notLivehasLastSeen, ...notLiveNoLastSeen];
}

export default MemberList;