export interface ChannelProps {
  children?: any,
  member?: any
}
 
const Channel: React.FC<ChannelProps> = ({ children, member }) => {
  const { stream } = member;
  const { label, live, url, url_alt } = stream;
          
  let channelClass = "channel";
  channelClass += (live === true) ? " online" : " offline";
  let address = (label === "Twitch") ? url : url_alt;

  if (live) {
    return (
      <a 
        className={channelClass}
        rel="noreferrer"
        href={address} target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <div className={channelClass}>
      {children}
    </div>
  );
}
 
export default Channel;