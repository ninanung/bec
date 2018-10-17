importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

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