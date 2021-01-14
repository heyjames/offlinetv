import Loading from './loading';

function Refresh() {
  return (
    <div className="refresh">
      {/* <span className="text">REFRESHING</span> */}
      <Loading loading={true} size="xs" />
    </div>
  )
}

export default Refresh;