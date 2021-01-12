import * as React from 'react';
import './App.css';
import MemberList from './components/memberList';

function App() {
  return (
    <React.Fragment>
      <div className="App">

        <div className="main">
          <div className="masthead">
            <div className="moon"></div>
            <div className="cloud1"></div>
            <h1>
              <span className="header">Offline TV</span>
              <span className="subheader">& Friends!</span>
            </h1>
            <span className="cloud2"></span>
          </div>
          <MemberList />
        </div>

        <div className="footer-w">
        </div>
        <div className="footer">This is the footer.</div>

      </div>

      {/* <div id="spacer"></div> */}
      {/* <div id="site-info-p"><span id="site-info">?</span></div> */}
    </React.Fragment>
  );
}

export default App;
