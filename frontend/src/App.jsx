import React, { Component } from 'react';
import { connect } from 'react-redux';

import RouterRoot from './router_root';

import { bindActionCreators } from 'redux';
import * as actions from './store/action';

import './App.css';

const mapStateToProps = (state) => {
  return {
    signup_basic: state.signup_basic,
    signup_imap: state.signup_imap,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    store_signup_imap: actions.store_signup_imap,
    store_signup_basic: actions.store_signup_basic,
  }, dispatch)
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <RouterRoot />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
