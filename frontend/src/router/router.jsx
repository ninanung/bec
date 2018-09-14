import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Intro from '../components/intro/intro';
import Signup from '../components/signup/signup';
import SignupImap from '../components/signup/signup_imap';
import Home from '../components/home/home';
import SignupSmtp from '../components/signup/signup_smtp';
import RouteGuard from './route_guard';

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
          <RouteGuard exact={ true } path='/' component={ Intro } />
          <RouteGuard exact={ true } path='/signup' component={ Signup } />
          <RouteGuard exact={ true } path='/signup/imap' component={ SignupImap } />
          <RouteGuard exact={ true } path='/signup/smtp' component={ SignupSmtp } />
          <RouteGuard exact={ true } path='/home' component={ Home } />
          <RouteGuard exact={ true } path='/test/:test' component={ Intro } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default Router;