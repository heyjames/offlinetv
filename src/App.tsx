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
set REACT_APP_CONTACT=
//////////////////////////////////////////
// Windows Powershell/////////////////////
$Env:REACT_APP_CONTACT=
//////////////////////////////////////////
// MacOS or Linux Terminal ///////////////
export REACT_APP_CONTACT=
//////////////////////////////////////////
*/

function App() {
  const { themeID, setThemeID } = useTheme();

  return (
    <React.Fragment>
      <div className="App">

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
 
export default App;