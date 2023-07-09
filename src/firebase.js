// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCpSbRDxJVv3ZirPwwAE8LtDIOdwoJdcA",
  authDomain: "waitlist-a9c53.firebaseapp.com",
  projectId: "waitlist-a9c53",
  storageBucket: "waitlist-a9c53.appspot.com",
  messagingSenderId: "123427924462",
  appId: "1:123427924462:web:99b14e42a1d0ff673786ff",
  measurementId: "G-P9HMYB50Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
