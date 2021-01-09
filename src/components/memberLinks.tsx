import * as React from 'react';

export interface MemberLinksProps {
  member: {
    alias: string,
    name: string,
    stream: {
      avatar: string,
      handle: string,
      title: string,
      viewCount: number,
    },
    links: Array<any>
  }
}

const MemberLinks: React.SFC<MemberLinksProps> = ({ member }) => {
  const { stream } = member;

  return (
    <React.Fragment>
      <div className="stream-link">
        <span style={{ float: "left"}}>
          <div id="avatar"></div>
          
          <a rel="noreferrer" target="_blank" href={member.links[0].handle}>
            {member.alias}
          </a>

          <span
            className="stream-title"
            title="building a japanese-style house in hardcore vanilla minecraft"
          >{stream.title && " - " + stream.title}
          </span>
        </span>

        <span
          className="view-count"
          style={{ float: "right"}}
        >{stream.viewCount && stream.viewCount}<div id="platform"></div>
        </span>

        <div className="clear"></div>
      </div>
    </React.Fragment>
  );
}
 
export default MemberLinks;