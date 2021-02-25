import React from 'react';

export interface UnsupportedIconProps {
  platformLabel: string
}
 
const UnsupportedIcon: React.FC<UnsupportedIconProps> = ({ platformLabel }) => {
  return (
    <div className="uptime">
      <i 
        className="fas fa-exclamation-triangle unsupported-platform-icon"
        title={platformLabel && (`${platformLabel} is unsupported`)}
      >
      </i>
    </div>
  );
}
 
export default UnsupportedIcon;