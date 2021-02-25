import React from 'react';
import '../App.css';

function Masthead() {
  return (
    <React.Fragment>
      <div className="masthead">
        <img src="/masthead.png" width="180" alt="OTV Dashboard" />
        <div className="moon"></div>
        <div className="cloud1"></div>
        <span className="cloud2"></span>
      </div>
      
      <div className="masthead-sm-p">
        <div className="masthead-sm">
          <span className="favicon-p"><img src="/favicon.ico" width="34" alt="OTV Dashboard" /></span>
          <span className="site-name">OTV Dashboard</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Masthead;