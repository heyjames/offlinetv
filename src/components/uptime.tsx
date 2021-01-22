import moment from 'moment';

export interface UptimeProps {
  streamStartedAt?: string;
  lastStreamedAt: string;
  live: boolean;
}
 
const Uptime: React.SFC<UptimeProps> = ({ streamStartedAt, lastStreamedAt, live }) => {
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

  return (
    <div className="uptime">
      {(live) ? uptime : lastStreamedAt}
    </div>
  );
}
 
export default Uptime;