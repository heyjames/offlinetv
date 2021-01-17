export interface NameProps {
  member: any
}
 
const Name: React.SFC<NameProps> = ({ member }) => {
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
    <a className="name" rel="noreferrer" href={stream.url} target="_blank">
      {member.alias}
    </a>
  );
}
 
export default Name;