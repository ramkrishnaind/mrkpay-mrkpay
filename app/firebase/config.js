// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYXkCVB04Gs8bQo9vt_BolTyTJZgUKsEk",
  authDomain: "mrk-pay-app1.firebaseapp.com",
  projectId: "mrk-pay-app1",
  storageBucket: "mrk-pay-app1.appspot.com",
  messagingSenderId: "554657058894",
  appId: "1:554657058894:web:29406b8e1c7542eb00f31f",
  measurementId: "G-V377VMZM2W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
