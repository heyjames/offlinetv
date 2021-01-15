import * as React from 'react';
import { pause, mySort } from '../utils';
import { getMembers } from '../services/memberService';
import { getStreamer, getStream } from '../services/twitchService';
import { Stream } from '../types/Stream';
import Loading from './loading';
import _ from 'lodash';
import moment from 'moment';

export interface MemberListProps {
}
 
export interface MemberListState {
  loading: boolean,
  members: Array<any>
}

class MemberList extends React.Component<MemberListProps, MemberListState> {
  state = {
    loading: true,
    members: []
  };
  
  _isMounted = false;

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick(url: string) {
    window.open(url, "_blank");
  }

  // TODO: Refactor to be more abstract.
  getAPI = async (members: any) => {
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

  async componentDidMount() {
    console.log("Component starting to mount...");

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
        console.log("Component mounted.");
        // this.setState({ members });
        this.setState({ members, loading: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  populateList() {
    const { members } = this.state;

    return (
      <React.Fragment>
        {members.map((member: any, index) => {
          const { stream, api } = member;
          const { live } = stream;
          const { title, lastStream } = api;
          let elapsed = "";

          if (lastStream !== undefined) {
            const start = moment(lastStream);
            const now = moment();
            const hours = now.diff(start, "h");
            const minutes = now.diff(start, "m") % 60;
            let decimalHours = Math.round((minutes / 60) * 10) / 10;
            elapsed = `${hours + decimalHours} hrs`;

            console.log(hours);
            console.log(decimalHours);
          }
          
          let channelClass = "channel";
          if (live === true) {
            channelClass += " online";
          } else {
            channelClass += " offline";
          }

          return (
            <div 
              className={channelClass}
              key={index}
              onClick={() => this.handleClick(stream.url)}
            >
              <div className="avatar">
                {/* <div className="avatar-ring"></div> */}
                <img
                  className={stream.label.toLowerCase()}
                  src={api.logo || "/avatars/" + stream.avatar}
                  alt={member.alias.charAt(0)}
                />
              </div>
              
              <div className="details">
                <div className="ng">
                  <div className="name">
                    {member.alias}
                  </div>
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
                  <div className="uptime">
                    {/* <i className="far fa-clock fa-xs"></i> */}
                    {lastStream && elapsed}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  render() { 
    const { loading } = this.state;

    return (
      <div className="content">
        <Loading loading={loading}>
          {this.populateList()}
        </Loading>
      </div>
    );
  }
}
 
export default MemberList;