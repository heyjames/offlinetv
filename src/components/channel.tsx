export interface ChannelProps {
  children?: any,
  member?: any
}
 
const Channel: React.FC<ChannelProps> = ({ children, member }) => {
  const { stream } = member;
  const { live } = stream;
          
  let channelClass = "channel";
  channelClass += (live === true) ? " online" : " offline";

  if (live) {
    return (
      <a 
        className={channelClass}
        rel="noreferrer"
        href={stream.url} target="_blank"
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