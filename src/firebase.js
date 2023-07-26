// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW8Dssxc_jVhOsNfLNn1hY4pguZKS6xrw",
  authDomain: "application-19a4d.firebaseapp.com",
  projectId: "application-19a4d",
  storageBucket: "application-19a4d.appspot.com",
  messagingSenderId: "102211639112",
  appId: "1:102211639112:web:bd24272206d8cc0dbd057d",
  measurementId: "G-GL7GPNZG95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
