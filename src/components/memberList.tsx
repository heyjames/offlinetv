import * as React from 'react';
import { pause } from '../utils';
import { getMembers } from '../services/memberService';
import { getStreamer, getStream } from '../services/twitchService';
import { Stream } from '../types/Stream';
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

  handleClick = (url: string) => {
    window.open(url, "_blank");
  }

  // TODO: Refactor to be more abstract.
  // getAPI = async () => {
  //   for (let i=0; i<members.length; i++) {
  //     if (members[i].stream.label.toLowerCase() === "twitch") {
  //       const streamerData = await getStreamer(members[i].stream.id);
  //       const streamData = await getStream(members[i].stream.id);

  //       let stream: Stream = {};

  //       if (streamerData !== null) {
  //         stream.logo = streamerData.logo;
  //       }

  //       if (streamData !== null) {
  //         stream.viewers = streamData.viewers;
  //         stream.game = streamData.game;
  //         stream.lastStream = streamData.created_at;
  //         stream.title = streamData.channel.status;

  //         members[i].stream.live = true;
  //       }

  //       members[i].api = { ...members[i].api,  ...stream };
  //     } else {
  //       console.log("Skipping non-Twitch streamers...");
  //     }
  //   }
  // }

  async componentDidMount() {
    try {
      console.log("Component starting to mount...");
      await pause(0.5);
      const members = await getMembers();

      console.log("Component mounted.");
      this.setState({ members, loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  populateList() {
    const { members } = this.state;

    return (
      <React.Fragment>
        {members.map((member: any, index) => {
          const { live } = member.stream;
          // if (live === false) return (<div>Nothing to see here.</div>);
          
          const { stream } = member;
          const { api } = member;
          const { title } = api;
          // let title = api.title;
          
          // if (title.length > 43) title = stream.title.substring(0, 44);
          // if (window.innerWidth < 540) title = title.substring(0, 24);
          const css = (live === false) ? { opacity: 0.4 } : {};

          return (
            <div 
              className="channel no-select"
              style={css}
              key={index}
              onClick={() => this.handleClick(stream.url)}
            >
              <div className="avatar">
                <img
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
        
                <div className="view-count">
                  {live && api.viewers}
                </div>
                
                <div className="platform"></div>
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
        {loading && "Loading..."}
        {!loading && this.populateList()}
      </div>
    );
  }
}
 
export default MemberList;