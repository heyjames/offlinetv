import React, { useState, useEffect } from 'react';
import { themes } from './models/themes';
import Masthead from './components/masthead';
import MemberList from './components/memberList';
import Footer from './components/footer';
import './App.css';
// import { pause } from './utils';

/*
//////////////////////////////////////////
// How to setup environmental variables //
//////////////////////////////////////////
// Windows Command Prompt/////////////////
set REACT_APP_CONTACT=
set REACT_APP_API_URL=
set NODE_ENV=<development|production>
//////////////////////////////////////////
// Windows Powershell/////////////////////
$Env:REACT_APP_CONTACT=
$Env:REACT_APP_API_URL=
$Env:NODE_ENV=<development|production>
//////////////////////////////////////////
// MacOS or Linux Terminal ///////////////
export REACT_APP_CONTACT=
export REACT_APP_API_URL=
export NODE_ENV=<development|production>
//////////////////////////////////////////
*/

function App() {
  const { themeID, setThemeID } = useTheme();
  const [ isWWW ] = useState(window.location.host.startsWith("www"));
  
  useEffect(() => {
    (async () => {
      if (isWWW === false) {
        // await pause(2000);
        const location: any = window.location.protocol + "//www."
          + window.location.host + window.location.pathname;
        window.location = location;
      }
    })();
  });

  return (
    (!isWWW)
      ? (<React.Fragment></React.Fragment>)
      : (<div className="App">

          <div className="main">
            <Masthead />
            <MemberList />
          </div>

          <div className="spacer"></div>

          <Footer
            themes={themes}
            themeID={themeID}
            setThemeID={setThemeID}
          />

        </div>)
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
 
export default App;