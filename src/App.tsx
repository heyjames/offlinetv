import './App.css';
import MemberList from './components/memberList';

function App() {
  const handleLogo = () => {
    console.log("<3");
  }

  return (
    <div className="App">
      <span className="cloud"></span>
      <h1 className="no-select">

        <span className="header no-select" onClick={handleLogo}>
          Offline TV
        </span>
        <span className="subheader" onClick={handleLogo}>
          & Friends!
        </span>

      </h1>
      <span className="cloud2"></span>

      <MemberList />
      
    </div>
  );
}

export default App;
