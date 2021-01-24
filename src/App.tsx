import React, { useState, useEffect } from 'react';
import { themes } from './models/themes';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import Footer from './components/footer';
import './App.css';

function App() {
  const { themeID, setThemeID } = useTheme();
  const {
    aboutMessageStr,
    showAboutMessage,
    setShowAboutMessage
  } = useAboutMessage();

  return (
    <React.Fragment>
      <div className="App">

        <div className="main">
          <Masthead />
          <MemberList />
        </div>

        <div className="spacer"></div>

        <div id="about-message-p">
          <div id="about-message">
            {aboutMessageStr}
          </div>
        </div>

        <Footer
          themes={themes}
          themeID={themeID}
          setThemeID={setThemeID}
          showAboutMessage={showAboutMessage}
          setShowAboutMessage={setShowAboutMessage}
        />

      </div>
    </React.Fragment>
  );
}

function useTheme() {
  // Get theme from local storage.
  const LSThemeID: string | null | undefined = localStorage.getItem("theme");

  // Set themeID state.
  const initialThemeID: number = (LSThemeID === null) ? 0 : parseInt(LSThemeID);
  const [themeID, setThemeID] = useState(initialThemeID);

  // Handle theme events.
  useEffect(() => {
    // Reset theme ID to 0 if out of bounds. Deprecated? Fallback.
    // if (themeID <= -1) return setThemeID(3);
    // if (themeID >= 4) return setThemeID(0);
    
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
  });

  return { themeID, setThemeID };
}

function useAboutMessage() {
  // Handle footer's about message.
  let aboutMessageStr = `I made this to easily find Offline TV and associated \
live streamers across platforms.`;
  let [ showAboutMessage, setShowAboutMessage ] = useState(false);

  useEffect(() => {
    const node: any = document.getElementById("about-message-p");
    if (node === null) throw new Error("Failed to get about-message HTML node.");
    
    node.style.display = (showAboutMessage === true) ? "flex" : "none";

    window.scrollTo({
      top: window.outerHeight + 500,
      behavior: 'smooth'
    });
  });

  return { aboutMessageStr, showAboutMessage, setShowAboutMessage };
}
 
export default App;