import moment from 'moment';

export interface UptimeProps {
  lastStream?: string
}
 
const Uptime: React.SFC<UptimeProps> = ({ lastStream }) => {
  let uptime = "";

  if (lastStream !== undefined) {
    const start = moment(lastStream);
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
      {uptime}
    </div>
  );
}
 
export default Uptime;