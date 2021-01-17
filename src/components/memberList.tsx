import * as React from 'react';
// import { Stream, Streamer } from '../types/Stream';
import { pause, mySort } from '../utils';
import { getMembers } from '../services/memberService';
// import { getStreamer, getStream } from '../services/twitchService';
import Refresh from './refresh';
import Loading from './loading';
// import _ from 'lodash';
import Avatar from './avatar';
import Name from './name';
import Channel from './channel';
import Uptime from './uptime';

export interface MemberListProps {
}
 
export interface MemberListState {
  loading: boolean,
  refreshing: boolean,
  members: Array<any>,
}

class MemberList extends React.Component<MemberListProps, MemberListState> {
  constructor(props: MemberListProps) {
    super(props);
    
    this.state = {
      loading: true,
      refreshing: false,
      members: []
    };

    this.populateMembers = this.populateMembers.bind(this);
    this.autoRefresh = this.autoRefresh.bind(this);
  }
  
  _isMounted = false;
  _intervalID: any;
  _interval: number = 60000; // Milliseconds to refresh content.

  componentWillUnmount() {
    this._isMounted = false;

    if (this._intervalID !== null && this._intervalID !== undefined) {
      clearInterval(this._intervalID);
    }
  }

  componentDidMount() {
    console.log("Mounting....");
    this.populateMembers();

    if (this._intervalID) clearInterval(this._intervalID);
    this._intervalID = setInterval(this.autoRefresh, this._interval);
  }

  async autoRefresh() {
    if (this._isMounted) this.setState({ refreshing: true });
    await pause(4.5);
    this.populateMembers();
  }

  // TODO: Refactor to be more abstract.
  async getAPI(members: any) {
    for (let i=0; i<members.length; i++) {
      if (members[i].stream.label.toLowerCase() === "twitch") {
        try {
          // const streamerData = await getStreamer(members[i].stream.id);
          // const streamData = await getStream(members[i].stream.id);
          // console.log(streamerData);
          // console.log(streamData);
          // let stream: Stream = {};

          // if (streamerData !== null) {
          //   stream.logo = streamerData.logo;
          // }

          // if (streamData !== null) {
          //   stream.viewers = streamData.viewers;
          //   stream.game = streamData.game;
          //   stream.lastStream = streamData.created_at;
          //   stream.title = streamData.channel.status;
          //   stream.followers = streamData.channel.followers;

          //   members[i].stream.live = true;
          // }

          // members[i].api = { ...members[i].api,  ...stream };
        } catch (error) {
          console.error("error", error);
        }
      } else {
        console.log("Skipping non-Twitch streamers...");
      }
    }

    return members;
  }

  async populateMembers() {
    try {
      this._isMounted = true;

      // await pause(1.5);

      // Get all members
      let members = await getMembers();

      // Use API here to merge data into members
      // members = await this.getAPI(members);
      // console.log("members", members);

      // Sort
      // Get live members
      let liveMembers = members.filter((member) => member.stream.live === true);
      // Sort live members
      mySort(liveMembers, "api", "viewers");
      // Remove non-live members
      members = members.filter((member) => member.stream.live === false);
      // Sort non-live members by followers
      mySort(members, "api", "followers");
      // Merge live and non-live members
      members = [ ...liveMembers, ...members ];

      if (this._isMounted) {
        console.log("Mounted!");
        this.setState({ members, loading: false, refreshing: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() { 
    const { loading, refreshing, members } = this.state;

    return (
      <div className="content">
        <div className="notification">
          {/* <div className="message">Welcome!</div> */}
          { (!loading && refreshing) && <Refresh refreshing={refreshing}/>}
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