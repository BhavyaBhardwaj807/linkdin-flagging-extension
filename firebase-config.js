// Add Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyB6ZYtniEGEdwFFHcUhUD-GYQF8ALWxqfQ",
  authDomain: "linkedin-flagging-extension.firebaseapp.com",
  projectId: "linkedin-flagging-extension",
  storageBucket: "linkedin-flagging-extension.firebasestorage.app",
  messagingSenderId: "242686944679",
  appId: "1:242686944679:web:a77c2cebe1cc2aa9bb8282",
  measurementId: "G-8QM2M633TL"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();