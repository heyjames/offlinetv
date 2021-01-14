// TODO: Refactor to use hooks.
function renderLoadingIndicator(size="md") {
  return (
    <span id="loading-p">
      <span className={"loading-" + size}></span>
    </span>
  );
}

export interface LoadingProps {
  children?: any,
  loading: boolean,
  size?: string
}
 
const Loading: React.FC<LoadingProps> = ({ children, loading, size }) => {
  return ( loading ? renderLoadingIndicator(size) : children );
}
 
export default Loading;