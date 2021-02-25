import React from 'react';
import Name from './name';
import StreamTimeControl from './streamTimeControl';
import { Member } from '../types';
import UnsupportedIcon from './unsupportedIcon';

export interface DetailsOfflineProps {
  member: Member
}
 
const DetailsOffline: React.FC<DetailsOfflineProps> = ({ member }) => {
  const { stream, api } = member;
  const { live, last_stream_date: lastStreamedAt, label } = stream;
  const { stream_started_at: streamStartedAt } = api;
  const isFB = (label.toLowerCase() === "facebook");
  
  return (
    <div className="details">
      <div className="details-row">
        <Name member={member} />

        <div className="details-spacer"></div>
        
        {isFB
          ? <UnsupportedIcon platformLabel="Facebook Gaming" />
          : <StreamTimeControl
              streamStartedAt={streamStartedAt}
              lastStreamedAt={lastStreamedAt}
              live={live}
            />
        }
      </div>
    </div>
  );
}
 
export default DetailsOffline;