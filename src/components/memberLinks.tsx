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
      <div className="avatar">
        <img src={"/avatars/" + stream.avatar} />
      </div>
      
      <div className="details">
        <div className="name">
          {member.alias}
        </div>
        
        <div className="stream-title" title={stream.title}>
          {stream.title && stream.title.substring(0, 30) + "..."}
        </div>

        <div className="view-count">
          {stream.viewCount && stream.viewCount}
        </div>
        
        <div className="platform"></div>
      </div>
    </React.Fragment>
  );
}
 
export default MemberLinks;