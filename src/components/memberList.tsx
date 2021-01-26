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
    id: number;
    label: string;
    url: string;
    live: boolean;
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
  links: any
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
  const loading = useLoading();
  const refreshing = useRefreshing();
  const { members, notification } = useMembers();

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
          const { live, last_stream_date: lastStreamedAt } = stream;
          const { title, stream_started_at: streamStartedAt } = api;

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

function useLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await pause(1200);
      setLoading(false);
    })();
  }, [setLoading]);

  return loading;
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

function useMembers() {
  const [members, setMembers] = useState([]);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    setInterval(() => { (async () => {
      try {
        // throw new Error(); // Debug
        // Get members from node API.
        let { data: members } = await getMyAPI();
        // this.populateMembers(members, true);
        members = sortMembers(members, true);
        setMembers(members);
      } catch (error) {
        console.error("A network error has occurred. Falling back to offline (^_^) mode.");
        const notification = { level: "high", message: "Network error. Try reloading."};
        
        // Get members from offline JSON.
        let members: any = await getMembers(); // TODO: let members: any = await getMembers();
        members = sortMembers(members, false);
        setMembers(members);
        setNotification(notification);
      }
    })(); console.log("Refreshed") }, 5000);
  }, [setMembers, setNotification]);

  return {members, notification};
}

function useRefreshing() {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(false);
  }, [setRefreshing]);

  return refreshing;
}

function sortMembers(members: Member[], online: boolean) {
  let liveMembers: Member[] = [];

  // Get only the live members and sort by descending view count.
  if (online) {
    liveMembers = members.filter((member: Member) => member.stream.live === true);
    if (liveMembers.length > 1) mySort(liveMembers, "api", "viewers");
  }

  // Remove non-live members and sort by descending alias.
  members = members.filter((member: Member) => member.stream.live === false);
  members.sort((a, b) => (b.alias.toLowerCase() > a.alias.toLowerCase()) ? -1 : 1);

  // Merge live and non-live members
  if (online) {
    members = [...liveMembers, ...members];
  }

  return members;
}

export default MemberList;