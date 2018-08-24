import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import Router from './router/router';
import { store, persistor } from './store/store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div className='App'>
              <Router/>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
