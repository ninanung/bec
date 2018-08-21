import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Intro from '../components/intro/intro.js';
import Signup from '../components/signup/signup.js';
import SignupImap from '../components/signup/signup_imap.js';

class Router extends Component {
  render() {
    return (
        <div>
            <Route exact path='/' component={ Intro } />
            <Route exact path='/signup' component={ Signup } />
            <Route exact path='/signup/imap' component={ SignupImap } />
        </div>
    );
  }
}

export default Router;