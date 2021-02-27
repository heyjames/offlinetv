import React from 'react';
import Name from './name';
import StreamTimeControl from './streamTimeControl';
import { Member } from '../types';

export interface DetailsOnlineProps {
  member: Member
}
 
const DetailsOnline: React.FC<DetailsOnlineProps> = ({ member }) => {
  const { stream, api } = member;
  const { live, last_stream_date: lastStreamedAt } = stream;
  const { title, stream_started_at: streamStartedAt } = api;
  const viewers = api.viewers ? api.viewers.toLocaleString() : undefined;

  return (
    <div className="details">
      <div className="details-row">
        <Name member={member} />

        <div className="stream-title" title={title}>
          {live && title}
        </div>

        <div className="details-spacer"></div>

        <div className="view-count" title={viewers && `${viewers} viewers`}>
          {live && (api.viewers && api.viewers.toLocaleString())}
        </div>
      </div>

      <div className="details-row">
        <div className="game" title={api.game}>
          {live && api.game}
        </div>

        <div className="details-spacer"></div>
        
        <StreamTimeControl
          streamStartedAt={streamStartedAt}
          lastStreamedAt={lastStreamedAt}
          live={live}
        />
      </div>
    </div>
  );
}
 
export default DetailsOnline;