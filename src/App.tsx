import React, { useState, useEffect } from 'react';
import { themes } from './models/themes';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import Footer from './components/footer';
import './App.css';

function App() {
  // Get theme from local storage.
  const LSThemeID: string | null | undefined = localStorage.getItem("theme");

  // Set themeID state.
  const initialThemeID: number = (LSThemeID === null) ? 0 : parseInt(LSThemeID);
  const [ themeID, setThemeID ] = useState(initialThemeID);

  useEffect(() => {
    // Reset theme ID to 0 if out of bounds
    if (themeID <= -1) return setThemeID(3);
    if (themeID >= 4) return setThemeID(0);
    
    // Set the HTML body node's class name.
    let body: HTMLBodyElement | null = document.querySelector("body");
    if (body !== null) {
      body.className = themes[themeID]?.classLabel;
    } else {
      // Send message to notification area module.
      console.error("Failed to find HTML body node.");
    }
    
    // Save user set themeID to local storage.
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