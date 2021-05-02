import firebase from "firebase/app";
import "firebase/auth";
import router from "./router";
import "firebase/messaging";
import VueCookies from "vue-cookies";

firebase.initializeApp({
  apiKey: "AIzaSyCKdkT084eg8McRLr1Lnw07pZ_6TyrQCp0",
  authDomain: "tutor-search-project.firebaseapp.com",
  projectId: "tutor-search-project",
  storageBucket: "tutor-search-project.appspot.com",
  messagingSenderId: "26977274015",
  appId: "1:26977274015:web:0d2f8eaebd4352639d7aaa",
});
export default {
  auth: firebase.auth(),
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(function(result) {})
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function(response) {
        firebase
          .messaging()
          .deleteToken()
          .then(() => {
            VueCookies.remove("token")
            localStorage.clear();
            router.push("/login").catch((err) => {});
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
