// TODO: Refactor to use hooks.
function renderLoadingIndicator() {
  return (
    <span id="loading-p">
      <span></span>
    </span>
  );
}

export interface LoadingWrapperProps {
  children: any,
  loading: boolean
}
 
const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, loading }) => {
  return ( loading ? renderLoadingIndicator() : children );
}
 
export default LoadingWrapper;