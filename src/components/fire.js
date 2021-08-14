import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBalSMujgsUMmQ2QDwSE7SvFksIObWvLLM",
    authDomain: "passwordmanager-e3995.firebaseapp.com",
    projectId: "passwordmanager-e3995",
    storageBucket: "passwordmanager-e3995.appspot.com",
    messagingSenderId: "190519610891",
    appId: "1:190519610891:web:f42d3b73d33f74c2cd810e",
    measurementId: "G-WLJSZF2MLZ"
  };
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;