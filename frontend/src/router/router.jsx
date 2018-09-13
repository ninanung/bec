import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteGuard from './route_guard';

import Intro from '../components/intro/intro';
import Signup from '../components/signup/signup';
import SignupImap from '../components/signup/signup_imap';
import Home from '../components/home/home';
import SignupSmtp from '../components/signup/signup_smtp';

class NotFound extends Component {
  render() {
    return (
      <h1>404 not found</h1>
    )
  }
}

class Router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ Intro } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/signup/imap' component={ SignupImap } />
          <Route exact path='/signup/smtp' component={ SignupSmtp } />
          <Route exact path='/home' component={ Home } />
          <RouteGuard exact='true' path='/test' component={ Intro } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default Router;