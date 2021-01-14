import React, { useEffect } from 'react';
import './App.css';
import MemberList from './components/memberList';
import Refresh from './components/refresh';
import { pause } from './utils';

function App() {
  useEffect(() => {
    (async () => {
      await pause(2); // TODO: Set a fallback color theme in css file.
  
      let body: any = document.querySelector("body");
      body.className = "root-theme-dark theme-dark";
    })();
  });

  const aboutTitle: string = `I made this to quickly find Offline TV and \
related live streamers across platforms.`;
    
  return (
    <React.Fragment>
      <div className="App">

        <div className="main">
          <div className="masthead">
            <div className="moon"></div>
            <div className="cloud1"></div>
            <h1>
              <span className="header">OFFLINE TV</span>
              <span className="subheader">& FRIENDS!</span>
            </h1>
            <span className="cloud2"></span>
          </div>
          <div className="notification">
            {/* <div className="message">Welcome!</div> */}
            {/* <Refresh /> */}
          </div>
          
          <MemberList />
        </div>

        <div className="spacer"></div>
        <div className="footer">
          <span title={aboutTitle}>About</span>
        </div>

      </div>

      {/* <div id="spacer"></div> */}
      {/* <div id="site-info-p"><span id="site-info">?</span></div> */}
    </React.Fragment>
  );
}
 
export default App;