import React, { Component } from 'react';

import Signin from './components/signin/Signin';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="intro-header">
          <h1 className="intro-title">Welcome to Bec</h1>
        </header>
        <div className="intro-body">
          <Signin/>
        </div>
      </div>
    );
  }
}

export default App;
