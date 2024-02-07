importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({

    apiKey: "AIzaSyC3QJGdNdbzPRoi5usIcbGqGjA9jWl4AtY",
  
    authDomain: "sst-lsm.firebaseapp.com",
  
    projectId: "sst-lsm",
  
    storageBucket: "sst-lsm.appspot.com",
  
    messagingSenderId: "743685208691",
  
    appId: "1:743685208691:web:249e83e08e9f0fa2190806",
  
    measurementId: "G-ZKMJGYD2K1"
  
  });
  const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    (
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });