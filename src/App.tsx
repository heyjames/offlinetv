import React, { useState, useEffect } from 'react';
import Masthead from './components/masthead';
import Refresh from './components/refresh';
import MemberList from './components/memberList';
import './App.css';

function App() {
  enum ThemeLabel {
    Dark,
    Light,
    Lilypichu,
    Sykkuno
  }
  enum Theme {
    Dark = "root-theme-dark theme-dark",
    Light = "root-theme-light theme-light",
    Lilypichu = "root-theme-light theme-light lilypichu",
    Sykkuno = "root-theme-light theme-light sykkuno"
  }

  let theme = localStorage.getItem("theme");
  let myNum: any;
  if (theme !== null) {
    myNum = parseInt(theme);
  }
  
  const [count, setCount] = useState(myNum);
  useEffect(() => {
    if (count <= -1) setCount(3);
    if (count >= 4) setCount(0);
  });
  
  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    console.log("count", count);
  });

  useEffect(() => {
    let body: any = document.querySelector("body");

    if (count === 0) body.className = Theme.Dark;
    if (count === 1) body.className = Theme.Light;
    if (count === 2) body.className = Theme.Lilypichu;
    if (count === 3) body.className = Theme.Sykkuno;
    
    localStorage.setItem("theme", count.toString());
  });

  const aboutTitle: string = `I made this to quickly find Offline TV and \
related live streamers across platforms.`;

  return (
    <React.Fragment>
      <div className="App">

        <div className="main">
          <Masthead />
      
          <div className="notification">
            {/* <div className="message">Welcome!</div> */}
            {/* <Refresh /> */}
          </div>
      
          <MemberList />
        </div>

        <div className="spacer"></div>

        {/* // TODO: Extract footer to own module. */}
        <div className="footer">
          <span className="theme-label about" title={aboutTitle}>About</span>
          <span className="theme">
            <i
              className="fas fa-caret-left theme-back"
              onClick={() => setCount(count - 1)}
              >
            </i>
            <span className="theme-label">{ThemeLabel[count]}</span>
            <i
              className="fas fa-caret-right theme-forward"
              onClick={() => setCount(count + 1)}
            >
            </i>
          </span>
        </div>

      </div>
    </React.Fragment>
  );
}
 
export default App;