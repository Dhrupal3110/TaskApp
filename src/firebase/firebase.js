// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz09cvBWTMLbxP5owsz4iy51dmW16KEMY",
  authDomain: "taskapp-6f2bf.firebaseapp.com",
  projectId: "taskapp-6f2bf",
  storageBucket: "taskapp-6f2bf.appspot.com",
  messagingSenderId: "831673922986",
  appId: "1:831673922986:web:66ed0c1da865a5d97727d3",
  measurementId: "G-Z096ZEVWHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);


export  { auth };