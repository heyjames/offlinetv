import React, { useState, useEffect } from 'react';
import { THEMES } from './models/themes';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import Footer from './components/footer';
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
    
    // Save themeID to local storage.
    localStorage.setItem("theme", themeID.toString());
  }, [themeID]);

  return (
    <React.Fragment>
      <div className="App">

        <div className="main">
          <Masthead />
          <MemberList />
        </div>

        <div className="spacer"></div>
        <Footer themeID={themeID} setThemeID={setThemeID} />

      </div>
    </React.Fragment>
  );
}
 
export default App;