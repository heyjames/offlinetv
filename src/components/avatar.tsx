import React from 'react';

export interface AvatarProps {
  children?: any,
  member: any
}
 
const Avatar: React.SFC<AvatarProps> = ({ children, member }) => {
  const { stream, api } = member;
  const { live } = stream;

  if (live) {
    return (
      <div className="avatar">
        {children}
      </div>
    );
  }

  return (
    <a className="avatar" rel="noreferrer" href={stream.url} target="_blank">
      {children}
    </a>
  );
}
 
export default Avatar;