import React, { Component } from 'react';
import firebase from 'firebase';

import RouterRoot from './router_root';
import config from './fcm_config/fcm_config';

import './App.css';

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission().then(function() {
  console.log('have permissin');
  return messaging.getToken();
}).then(function(token) {
  //save token to persist state
  console.log(token);
}).catch(function(err) {
  console.log('fcm error : ', err);
})

messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    //save new token to persist state
    console.log('Token refreshed.');
    console.log(refreshedToken);
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage(function(payload) {
  //let user know they got a new mail
  alert('title: ' + payload.notification.title + ', body: ' + payload.notification.body);
})

class App extends Component {
  render() {
    return (
      <div className='App'>
        <RouterRoot />
      </div>
    );
  }
}

export default App;
