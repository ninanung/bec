import React, { Component } from 'react';
import firebase from 'firebase';

import RouterRoot from './router_root';
import fcm from './fcm_config/fcm_config';

import './App.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './store/action';

const mapStateToProps = (state) => {
  return {
    fcm_cloud_messaging_token: state.fcm_cloud_messaging_token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    insert_token: actions.insert_token, 
  }, dispatch)
}

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(fcm.config);
    const insert_token = this.props.insert_token;

    const messaging = firebase.messaging();
    messaging.requestPermission().then(function() {
      console.log('have permissin');
      return messaging.getToken();
    }).then(function(token) {
      insert_token(token);
    }).catch(function(err) {
      console.log('fcm error : ', err);
    })
    messaging.onTokenRefresh(function() {
      messaging.getToken().then(function(refreshedToken) {
        insert_token(refreshedToken);
        console.log('Token refreshed.');
      }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });

    messaging.onMessage(function(payload) {
      //let user know they got a new mail
      alert('Got a ' + payload.notification.title + '\n' + payload.notification.body);
    })
  }

  render() {
    return (
      <div className='App'>
        <RouterRoot />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
