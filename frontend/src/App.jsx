import React, { Component } from 'react';
import firebase from 'firebase';

import RouterRoot from './router_root';

import './App.css';

const config = {
  apiKey: "AIzaSyCy51cGwS63JhFMLnDCdrbdIHwbGcBfQxs",
  authDomain: "imap-push-server.firebaseapp.com",
  databaseURL: "https://imap-push-server.firebaseio.com",
  projectId: "imap-push-server",
  storageBucket: "imap-push-server.appspot.com",
  messagingSenderId: "89427097314"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission().then(function() {
  console.log('have permissin');
  return messaging.getToken();
}).then(function(token) {
  console.log(token);
}).catch(function(err) {
  console.log('fcm error : ', err);
})

messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    console.log('Token refreshed.');
    console.log(refreshedToken);
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

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
