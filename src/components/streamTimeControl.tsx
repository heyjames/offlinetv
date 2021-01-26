import React from 'react';
import moment from 'moment';

export interface StreamTimeControlProps {
  streamStartedAt?: string;
  lastStreamedAt: string;
  live: boolean;
}
 
const StreamTimeControl: React.FC<StreamTimeControlProps> = ({
  streamStartedAt,
  lastStreamedAt,
  live
}) => {
  const dateTimeFormat = "MMM DD, YYYY (h:mm A)";
  let streamStartedAtLabel = "";
  const lastStreamedAtLabel = (lastStreamedAt !== "")
                            ? moment(lastStreamedAt).fromNow()
                            : "";
  const streamStartedAtTitle = `Stream start time: ${moment(streamStartedAt)
    .format(dateTimeFormat)}`
  const lastStreamedAtTitle = `Last seen streaming approx.: ${moment(lastStreamedAt)
    .format(dateTimeFormat)}`;

  // Format from ISO date to e.g. "1.2 hrs".
  if (streamStartedAt !== undefined) {
    const start = moment(streamStartedAt);
    const now = moment();
    const hours = now.diff(start, "h");
    const minutes = now.diff(start, "m") % 60;
    const decimalHours = Math.round((minutes / 60) * 10) / 10;
    streamStartedAtLabel = `${hours + decimalHours} hrs`;
  }

  if (live === true) {
    return (
      <div 
        className="uptime" 
        title={streamStartedAtTitle}
      >
        {streamStartedAtLabel}
      </div>
    );
  }

  return (
    <div 
      className="uptime" 
      title={lastStreamedAtTitle}
    >
      {lastStreamedAtLabel}
    </div>
  );
}
 
export default StreamTimeControl;