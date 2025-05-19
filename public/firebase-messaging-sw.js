// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyC7wn9t3AQk_DFs80d0jhp9wm3rGR90kys',
  authDomain: 'poomasi-firebase.firebaseapp.com',
  projectId: 'poomasi-firebase',
  storageBucket: 'poomasi-firebase.firebasestorage.app',
  messagingSenderId: '1049468197033',
  appId: '1:1049468197033:web:6fc6879b0ebb98898b71b8',
})

const messaging = firebase.messaging()

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/poomasi_logo.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
