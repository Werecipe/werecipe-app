import firebase from "firebase/app";
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDe8isKZjVkNok7Tc80nyqfcjbcLi0aJ6g",
    authDomain: "werecipeapp.firebaseapp.com",
    projectId: "werecipeapp",
    storageBucket: "werecipeapp.appspot.com",
    messagingSenderId: "423573437914",
    appId: "1:423573437914:web:7aca4e6801aafe3dd394e3",
    measurementId: "G-M95DT9RP58"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAnalytics = firebase.analytics();
let FBauth = firebaseApp.auth();
let db = firebaseApp.firestore();

export {
  FBauth, db
}



