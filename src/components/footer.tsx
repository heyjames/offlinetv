import { themes } from '../models/themes';
import { Theme } from '../types';
import React, { useState, useEffect } from 'react';

export interface FooterProps {
  themes: Theme[],
  themeID: number,
  setThemeID: any
}

const Footer: React.FC<FooterProps> = ({ themeID, setThemeID }) => {
  const { aboutMessageStr, showAboutMessage, setShowAboutMessage } = useAboutMessage();

  return (
    <React.Fragment>
      <div id="about-message-p">
        <div id="about-message">
          {aboutMessageStr} {renderContactMessage()}
        </div>
      </div>

      <div className="footer">

        <span
          className="theme-label about button"
          onClick={() => setShowAboutMessage(!showAboutMessage)}
        >
          About
        </span>

        <span className="theme">
          <i
            className="fas fa-caret-left theme-back button"
            onClick={() => setThemeID((themeID - 1 + themes.length) % themes.length)}
          >
          </i>

          <span
            className="theme-label"
            title={themes[themeID] && themes[themeID].remark}
          >
            {themes[themeID] && themes[themeID].label}
          </span>
          
          <i
            className="fas fa-caret-right theme-forward button"
            onClick={() => setThemeID((themeID + 1) % themes.length)}
          >
          </i>
        </span>
      </div>
    </React.Fragment>
  );
}

// Handle footer's about message.
function useAboutMessage() {
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

function renderContactMessage() {
  if (process.env.REACT_APP_CONTACT === undefined) return null;
  
  return (
    <React.Fragment>
      You can message me on <a
        rel="noreferrer"
        style={{ color: "rgba(255, 255, 255, 0.8)" }}
        href={process.env.REACT_APP_CONTACT}
        target="_blank"
      >
        Reddit
      </a> <i className="fas fa-external-link-alt fa-xs">
      </i> if you have any questions or to let me know if you find this site useful.
    </React.Fragment>
  )
}
 
export default Footer;