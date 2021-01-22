import * as React from 'react';
import { pause, mySort } from '../utils';
import { getMembers } from '../services/memberService';
import { getMyAPI } from '../services/twitchService';
import Refresh from './refresh';
import Loading from './loading';
// import _ from 'lodash';
import Avatar from './avatar';
import Name from './name';
import Channel from './channel';
import Uptime from './uptime';

interface Member {
  alias: string;
  name: string;
  stream: {
    id: number;
    label: string;
    url: string;
    live: boolean;
    avatar: string;
  },
  api: {
    viewers?: number;
    game?: string;
    lastStream?: string;
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

class MemberList extends React.Component<MemberListProps, MemberListState> {
  constructor(props: MemberListProps) {
    super(props);
    
    this.state = {
      loading: true,
      refreshing: false,
      members: [],
      notification: {}
    };

    this.populateMembers = this.populateMembers.bind(this);
    this.autoRefresh = this.autoRefresh.bind(this);
  }
  
  _isMounted: boolean = false;
  _intervalID: any = null;
  _interval: number = 60000; // Milliseconds to refresh content.

  componentWillUnmount() {
    this._isMounted = false;

    if (this._intervalID !== null && this._intervalID !== undefined) {
      clearInterval(this._intervalID);
    }
  }

  componentDidMount() {
    console.log("Mounting....");

    this.getData();

    if (this._intervalID) clearInterval(this._intervalID);
    this._intervalID = setInterval(this.autoRefresh, this._interval);
  }

  async autoRefresh() {
    if (this._isMounted) {
      this.setState({ refreshing: true });
    }

    await pause(5000); // Show a lengthy loading animation to user.

    this.getData();
  }

  async getData() {
    try {
      // throw new Error(); // Debug
      // Get members from node API.
      let { data: members } = await getMyAPI();
      this.populateMembers(members, true);
    } catch (error) {
      console.error("A network error has occurred. Falling back to offline (^_^) mode.");
      const notification = { level: "high", message: "Network error. Try reloading."};
      
      // Get members from offline JSON.
      let members: Member[] = await getMembers();
      this.populateMembers(members, false, notification);
    }
  }

  populateMembers(members: Member[], online: boolean, notification: Notification = {}) {
    this._isMounted = true;
    
    members = this.sortMembers(members, online);

    if (this._isMounted) {
      console.log("Mounted!");
      this.setState({ members, loading: false, refreshing: false, notification });
    }
  }

  sortMembers(members: Member[], online: boolean) {
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
      members = [ ...liveMembers, ...members ];
    }

    return members;
  }

  renderNotification() {
    const { level, message } = this.state.notification;

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

  render() { 
    const { loading, refreshing, members, notification } = this.state;

    return (
      <div className="content">
        <div className="notification">
          <div className="message">
            {notification.message && this.renderNotification()}
          </div>
          { (!loading && refreshing) && <Refresh refreshing={refreshing}/> }
        </div>

        <Loading loading={loading}>
          {members.map((member: any, index) => {
            const { stream, api } = member;
            const { live } = stream;
            const { title, lastStream } = api;

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
                    <Uptime lastStream={lastStream} />
                  </div>
                </div>
              </Channel>
            );
          })}
        </Loading>
      </div>
    );
  }
}
 
export default MemberList;