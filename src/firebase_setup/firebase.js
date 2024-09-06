// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

/* import { getAnalytics } from "firebase/analytics"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBPhlLQO_Tx2YZ8lx8XXd9_MGg3ckHtjCo",
  authDomain: "relate-mvp.firebaseapp.com",
  databaseURL: "https://relate-mvp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "relate-mvp",
  storageBucket: "relate-mvp.appspot.com",
  messagingSenderId: "731812672326",
  appId: "1:731812672326:web:580a93264b3bff12f86b47",
  measurementId: "G-T82G1Y5ME1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

const auth = getAuth(app);

const db = getFirestore(app)

export { auth, db }