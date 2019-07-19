import * as React from 'react';
import './App.css';
import Heroes from './Heroes';
import Messages from './Messages';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Tour of Heroes</h1>
      </div>
      <Heroes/>
      <Messages/>
    </div>
  );
}

export default App;
