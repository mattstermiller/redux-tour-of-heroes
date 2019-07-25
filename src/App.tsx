import * as React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import Messages from './Messages';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Tour of Heroes</h1>
      </div>
      <AppRouter/>
      <Messages/>
    </div>
  );
}

export default App;
