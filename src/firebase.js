import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAcU1yh6UIajhuY5ZSfAWXCB3laMIMWMMs",
  authDomain: "otpauth-72ab0.firebaseapp.com",
  projectId: "otpauth-72ab0",
  storageBucket: "otpauth-72ab0.appspot.com",
  messagingSenderId: "267509342534",
  appId: "1:267509342534:web:a3a81205df4cffe8150547"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default firebase
