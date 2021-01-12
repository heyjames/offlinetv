import * as React from 'react';
import './App.css';
import MemberList from './components/memberList';

function App() {
  const handleLogo = () => {
    console.log("<3");
  }

  return (
    <React.Fragment>
    <div className="App no-select">
      <span className="moon"></span>
      <span className="cloud"></span>
      <h1>
        <span className="header" onClick={handleLogo}>
          Offline TV
        </span>
        <span className="subheader" onClick={handleLogo}>
          & Friends!
        </span>

      </h1>
      <span className="cloud2"></span>

      <MemberList />
      
      {/* <footer>This is the footer.</footer> */}
    </div>

    <div id="spacer"></div>
    <div id="site-info-p"><span id="site-info">?</span></div>
    </React.Fragment>
  );
}

export default App;
