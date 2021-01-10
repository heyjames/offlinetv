import React from 'react';
import './App.css';
// import { getMembers } from './services/memberService';
import MemberList from './components/memberList';

function App() {
  // const members = getMembers();

  return (
    <div className="App">
      <h1>
        <span className="header">Offline TV</span>
        <span className="subheader">& Friends!</span>
      </h1>

      <MemberList />
    </div>
  );
}

export default App;
