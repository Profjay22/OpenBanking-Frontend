// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWnmKp-m4W4zunCxBjF3CWLtcV-tI3o-s",
  authDomain: "open-banking-authentication.firebaseapp.com",
  projectId: "open-banking-authentication",
  storageBucket: "open-banking-authentication.appspot.com",
  messagingSenderId: "730638756124",
  appId: "1:730638756124:web:b04b6f6b53d715e98872d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
