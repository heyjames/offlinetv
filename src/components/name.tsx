export interface NameProps {
  member: any
}
 
const Name: React.FC<NameProps> = ({ member }) => {
  const { stream } = member;
  const { live } = stream;

  if (live) {
    return (
      <div className="name">
        {member.alias}
      </div>
    );
  }
  
  return (
    <div className="name">
      <a rel="noreferrer" href={stream.url} target="_blank">
        {member.alias}
      </a>
    </div>
  );
}
 
export default Name;