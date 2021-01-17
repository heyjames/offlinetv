import Loading from './loading';

function Refresh(refreshing: any) {
  return (
    <div className="refresh">
      {/* <span className="text">REFRESHING</span> */}
      <Loading loading={refreshing} size="xs" />
    </div>
  )
}

export default Refresh;