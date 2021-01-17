import React, { useState, useEffect } from 'react';
import { THEMES } from './models/themes';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import './App.css';

function App() {
  // Get theme from local storage.
  const theme: string | null | undefined = localStorage.getItem("theme");

  // If theme from local storage exists, set themeID state.
  const initThemeID: number = (theme !== null) ? parseInt(theme) : 0;
  const [themeID, setThemeID] = useState(initThemeID);

  useEffect(() => {
    // Reset theme ID
    if (themeID <= -1) return setThemeID(3);
    if (themeID >= 4) return setThemeID(0);
    
    // Set the body HTML node class name.
    let body: any = document.querySelector("body");
    body.className = THEMES[themeID]?.classLabel;
    
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

        {/* // TODO: Extract footer to own Component. */}
        {/* // Component interface: aboutTitle, setThemeID, ThemeLabel[themeID] */}
        <div className="footer">
          <span className="theme-label about" title={aboutTitle}>About</span>
          <span className="theme">
            <i
              className="fas fa-caret-left theme-back"
              onClick={() => setThemeID(themeID - 1)}
              >
            </i>
            <span
              className="theme-label"
              title={THEMES[themeID]?.remark}
            >
              {THEMES[themeID]?.label}
            </span>
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