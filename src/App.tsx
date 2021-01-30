import React, { useState, useEffect } from 'react';
import { themes } from './models/themes';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import Footer from './components/footer';
import './App.css';

/*
//////////////////////////////////////////
// How to setup environmental variables //
//////////////////////////////////////////
// Windows Command Prompt/////////////////
set REACT_APP_CONTACT_EMAIL=
//////////////////////////////////////////
// Windows Powershell/////////////////////
$Env:REACT_APP_CONTACT_EMAIL=
//////////////////////////////////////////
// MacOS or Linux Terminal ///////////////
export REACT_APP_CONTACT_EMAIL=
//////////////////////////////////////////
*/

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
            {aboutMessageStr} {renderContactMessage()}
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

function renderContactMessage() {
  if (process.env.REACT_APP_CONTACT === undefined) return null;
  
  return (
    <React.Fragment>
      You can contact me on <a
        rel="noreferrer"
        style={{ color: "rgba(255, 255, 255, 0.8)" }}
        href={process.env.REACT_APP_CONTACT}
        target="_blank"
      >
        Reddit
      </a> <i className="fas fa-external-link-alt fa-xs"></i>.
    </React.Fragment>
  )
}

// Handle footer's about message.
function useAboutMessage() {
  // let contact = "";
  // let hyperlink = null;
  // if (process.env.REACT_APP_CONTACT !== undefined) {
  //   hyperlink = ` <a rel="noreferrer" href="${process.env.REACT_APP_CONTACT}" target="_blank">Reddit</a>`;
  //   contact = ` You can contact me at${hyperlink}`;
  // }

  let aboutMessageStr = `I made this to easily find Offline TV and associated \
live streamers. Ideally, it should include all members from all platforms, but \
I'm having difficulty understanding Facebook's API (sorry DisguisedToast), so \
only Twitch and YouTube are currently supported.`;
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