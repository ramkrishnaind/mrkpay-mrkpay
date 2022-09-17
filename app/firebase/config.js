// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA07QDzldUaN-fH5C86pNde9QxQqu1-4BI",
  authDomain: "mrkpay-d3200.firebaseapp.com",
  projectId: "mrkpay-d3200",
  storageBucket: "mrkpay-d3200.appspot.com",
  messagingSenderId: "812611727342",
  appId: "1:812611727342:web:f2114cf3a4b48fd962e8ff",
  measurementId: "G-2ZBBJ06RLX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
