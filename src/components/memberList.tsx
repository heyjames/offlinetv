import React, { useState, useEffect } from 'react';
import { pause, sortMembers } from '../utils';
import { getMembers, getMembersOffline } from '../services/memberService';
import Refresh from './refresh';
import Loading from './loading';
// import _ from 'lodash';
import Avatar from './avatar';
import Channel from './channel';
import NotificationMessage from './NotificationMessage';
import Details from './details';
import { Member, Notification } from '../types';
 
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
      const showRefreshTime = 4500;
      const intervalTime = 60000;

      // Initialize interval
      let interval: any;
      if (interval) clearInterval(interval);

      // Get members
      const members = await getAndSortMembers(setNotification);
      setMembers(members);
      setLoading(false);

      // Initialize auto refresh
      interval = setInterval(async () => {
        setRefreshing(true);

        await pause(showRefreshTime);
        const members = await getAndSortMembers(setNotification);
        setMembers(members);

        setRefreshing(false);
      }, intervalTime);

      return () => clearInterval(interval);
    })();
  }, [setMembers, setRefreshing, setLoading]);

  return (
    <div className="content">
      <div className="notification">
        <NotificationMessage notification={notification} />

        { (!loading && refreshing) && <Refresh refreshing={refreshing}/> }
      </div>

      <Loading loading={loading}>
        {members.map((member: Member, index) => {
          const { stream, api } = member;
          const { live } = stream;

          return (
            <Channel key={index} member={member}>
              <Avatar member={member}>
                <img
                  className={stream.label.toLowerCase()}
                  src={api.logo || "/avatars/" + stream.avatar}
                  alt={member.alias.charAt(0)}
                />
              </Avatar>
            
              <Details live={live} member={member} />
              
            </Channel>
          );
        })}
      </Loading>
    </div>
  );
}

async function getAndSortMembers(setNotification: React.Dispatch<React.SetStateAction<{}>>) {
  try {
    let { data: members, errors } = await getMembers();
    members = sortMembers(members, true);

    // TODO: Convert to array and use a looping function.
    if (errors.length === 0) {
      setNotification({});
    } else {
      const errorMessage = handleErrorNotificationMessage(errors);
      setNotification({ level: "moderate", message: errorMessage});
    }
    
    return members;
  } catch (error) {
    console.error("A network error has occurred. Falling back to offline mode.");
    let { data: members }: any = await getMembersOffline();
    members = sortMembers(members, false);
    setNotification({ level: "high", message: "Network error. Try reloading."});

    return members;
  }
}

function handleErrorNotificationMessage(errors: string[]): string {
  let errorMessage = "";
  let platformErrors = [];
  let platformErrorsMessage = "";

  errors.includes("twitch") && platformErrors.push("Twitch");
  errors.includes("youtube") && platformErrors.push("YouTube");
  errors.includes("facebook") && platformErrors.push("Facebook");

  if (platformErrors.length > 0) {
    if (platformErrors.length === 1) {
      platformErrorsMessage = platformErrors[0];
    }

    if (platformErrors.length > 1) {
      platformErrorsMessage = platformErrors.join(", ");
    }

    errorMessage = `Failed to update ${platformErrorsMessage} results`;
  }

  return errorMessage.trim();
}

export default MemberList;