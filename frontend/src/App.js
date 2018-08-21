import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/router.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Router/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
