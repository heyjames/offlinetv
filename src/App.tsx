import React from 'react';
import './App.css';
import { getMembers } from './services/memberService';
import MemberList from './components/memberList';

/**
 * Pause code execution to simulate a slow API call.
 * Example: await pause(1);
 *
 * @param  {String}  seconds Time in seconds to pause code execution.
 * @return {Promise}
 */
// function pause(seconds) {
//   return new Promise(resolve => {
//       setTimeout(() => { resolve() }, seconds * 1000);
//   });
// }

function App() {
  const members = getMembers();

  return (
    <div className="App">
      <h1 className="header">Offline TV & Friends!</h1>
      <MemberList members={members} />
    </div>
  );
}

export default App;
