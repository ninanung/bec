import React, { Component } from 'react';

import Signin from './components/signin/Signin';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="intro-header">
          <h1 className="intro-title">Bec</h1>
          <h2 className="intro-subtitle">better e-mail client</h2>
        </header>
        <div className="intro-body">
          <Signin/>
        </div>
      </div>
    );
  }
}

export default App;
