import * as React from 'react';
import './App.css';
import MemberList from './components/memberList';

function App() {
  return (
    <React.Fragment>
    <div className="App no-select">
      <span className="moon"></span>
      <span className="cloud"></span>
      <h1>
        <span className="header">
          Offline TV
        </span>
        <span className="subheader">
          & Friends!
        </span>

      </h1>
      <span className="cloud2"></span>

      <MemberList />
    </div>

    <div id="spacer"></div>
    {/* <div id="site-info-p"><span id="site-info">?</span></div> */}
    </React.Fragment>
  );
}

export default App;
