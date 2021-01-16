import React from 'react';
import '../App.css';

function Masthead() {
  return (
    <div className="masthead">
      <div className="moon"></div>
      <div className="cloud1"></div>

      <h1>
        <span className="header">OFFLINE TV</span>
        <span className="subheader">& FRIENDS!</span>
      </h1>

      <span className="cloud2"></span>
    </div>
  );
}

export default Masthead;