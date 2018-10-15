import React, { Component } from 'react';
import socketIoClient from 'socket.io-client'

import RouterRoot from './router_root';

import './App.css';

class App extends Component {
  componentWillMount() {
    const socket = socketIoClient('http://localhost:3001')
    /*socket.on('change color', (col) => {
      console.log(col);
    })*/  
  }

  render() {
    return (
      <div className='App'>
        <RouterRoot />
      </div>
    );
  }
}

export default App;
