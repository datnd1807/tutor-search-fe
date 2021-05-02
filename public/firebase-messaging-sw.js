importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");

try {
  firebase.initializeApp({
    apiKey: "AIzaSyCKdkT084eg8McRLr1Lnw07pZ_6TyrQCp0",
    authDomain: "tutor-search-project.firebaseapp.com",
    projectId: "tutor-search-project",
    storageBucket: "tutor-search-project.appspot.com",
    messagingSenderId: "26977274015",
    appId: "1:26977274015:web:0d2f8eaebd4352639d7aaa",
  });
} catch (err) {
  console.log(err);
}
