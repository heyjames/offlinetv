import * as React from 'react';
import './App.css';
import MemberList from './components/memberList';
import Reload from './components/reload';

export interface AppProps {
  
}
 
export interface AppState {
  
}

// TODO: Change to React hooks.
class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    let body: any = document.querySelector("body");
    body.className = "root-theme-light theme-light sykkuno";
  }
  
  render() { 
    const aboutTitle: string = `I made this because I wanted a simple website to \
find Offline TV and related live streamers across platforms.`;
  
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
              {/* <Reload /> */}
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
}
 
export default App;