import React from 'react';
import moment from 'moment';

export interface StreamTimeControlProps {
  streamStartedAt?: string;
  lastStreamedAt: string;
  live: boolean;
}
 
const StreamTimeControl: React.SFC<StreamTimeControlProps> = ({ streamStartedAt, lastStreamedAt, live }) => {
  let uptime = "";
  lastStreamedAt = (lastStreamedAt) ? moment(lastStreamedAt).fromNow() : "";

  if (streamStartedAt !== undefined) {
    const start = moment(streamStartedAt);
    const now = moment();
    const hours = now.diff(start, "h");
    const minutes = now.diff(start, "m") % 60;
    let decimalHours = Math.round((minutes / 60) * 10) / 10;
    uptime = `${hours + decimalHours} hrs`;

    // console.log(hours);
    // console.log(decimalHours);
  }

  if (live === true) return <div className="uptime" title={"Uptime"}>{uptime}</div>;

  return <div className="uptime" title={"Last recorded stream"}>{lastStreamedAt}</div>;
}
 
export default StreamTimeControl;