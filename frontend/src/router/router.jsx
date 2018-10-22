import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Intro from '../components/intro/intro';
import Signup from '../components/signup/signup';
import SignupImap from '../components/signup/signup_imap';
import Home from '../components/home/home';
import SignupSmtp from '../components/signup/signup_smtp';
import RouteGuard from './route_guard';
import HomeIntro from '../components/home_intro/home_intro';

class NotFound extends Component {
  render() {
    return (
      <h1>404 not found</h1>
    )
  }
}

class Router extends Component {
  render() {
    const outside = [true, '/home/mailbox/unread'];
    const inside = [false, '/'];
    return (
      <Switch>
        <RouteGuard exact={ true } path='/' component={ Intro } option={ outside } />
        <RouteGuard exact={ true } path='/signup' component={ Signup } option={ outside } />
        <RouteGuard exact={ true } path='/signup/imap' component={ SignupImap } option={ outside } />
        <RouteGuard exact={ true } path='/signup/smtp' component={ SignupSmtp } option={ outside } />
        <RouteGuard exact={ true } path='/home' component={ HomeIntro } option={ inside } />
        <RouteGuard exact={ true } path='/home/:address' component={ Home } option={ inside } />
        <RouteGuard exact={ true } path='/home/mailbox/:address' component={ Home } option={ inside } /> 
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default Router;