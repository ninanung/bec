import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Intro from '../components/intro/intro';
import Signup from '../components/signup/signup';
import SignupImap from '../components/signup/signup_imap';

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