import * as React from 'react';

export interface MemberListProps {
  members: Array<any>
}

const handleClick = (url: string) => {
  window.open(url, "_blank");
}

const MemberList: React.SFC<MemberListProps> = ({ members }) => {
  return (
    <div className="content">
      {members.map((member, index) => {
        const { stream } = member;

        return (
          <div className="channel" key={index} onClick={() => handleClick(stream.url)}>
            <div className="avatar">
              <img src={"/avatars/" + stream.avatar} alt={stream.avatar} />
            </div>
            
            <div className="details">
              <div className="ng">
                <div className="name">
                  {member.alias}
                </div>
                <div className="game">
                  Rust
                </div>
              </div>
              
              <div className="stream-title" title={stream.title}>
                {stream.title && stream.title.substring(0, 58)}
              </div>
      
              <div className="view-count">
                {stream.viewCount && stream.viewCount}
              </div>
              
              <div className="platform"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
 
export default MemberList;