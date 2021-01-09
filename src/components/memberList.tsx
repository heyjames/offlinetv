import * as React from 'react';
import MemberLinks from './memberLinks';

export interface MemberListProps {
  members: Array<any>
}

const MemberList: React.SFC<MemberListProps> = ({ members }) => {
  return (
    <div className="content">
      {members.map((member, index) => {
        return (
          <div className="channel" key={index}>
            <MemberLinks member={member} />
          </div>
        );
      })}
    </div>
  );
}
 
export default MemberList;