import React, { useState, useEffect } from 'react';
import { Theme, ThemeLabel } from './types/Theme';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import './App.css';

function App() {
  // Get theme from local storage.
  const theme: string | null | undefined = localStorage.getItem("theme");

  // If theme from local storage exists, set state to theme themeID
  const initThemeID: number = (theme !== null) ? parseInt(theme) : 0;
  const [themeID, setThemeID] = useState(initThemeID);

  useEffect(() => {
    // Reset theme ID
    if (themeID <= -1) return setThemeID(3);
    if (themeID >= 4) return setThemeID(0);
    
    // Set the body HTML node class name.
    let body: any = document.querySelector("body");
    if (themeID === 0) body.className = Theme.Dark;
    if (themeID === 1) body.className = Theme.Light;
    if (themeID === 2) body.className = Theme.LilyPichu;
    if (themeID === 3) body.className = Theme.Sykkuno;
    
    localStorage.setItem("theme", themeID.toString());
  }, [themeID]);

  const aboutTitle: string = `I made this to quickly find Offline TV and \
related live streamers across platforms.`;

  return (
    <React.Fragment>
      <div className="App">

        <div className="main">
          <Masthead />
      
          <MemberList />
        </div>

        <div className="spacer"></div>

        {/* // TODO: Extract footer to own module. */}
        {/* // Component interface: aboutTitle, setThemeID, ThemeLabel[themeID] */}
        <div className="footer">
          <span className="theme-label about" title={aboutTitle}>About</span>
          <span className="theme">
            <i
              className="fas fa-caret-left theme-back"
              onClick={() => setThemeID(themeID - 1)}
              >
            </i>
            <span className="theme-label">{ThemeLabel[themeID]}</span>
            <i
              className="fas fa-caret-right theme-forward"
              onClick={() => setThemeID(themeID + 1)}
            >
            </i>
          </span>
        </div>

      </div>
    </React.Fragment>
  );
}
 
export default App;