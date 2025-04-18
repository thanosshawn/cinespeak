// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7AaSc-eQbv78m6jKxSE-FMYuAvpgvx8o",
  authDomain: "streamspeak-81086.firebaseapp.com",
  projectId: "streamspeak-81086",
  storageBucket: "streamspeak-81086.firebasestorage.app",
  messagingSenderId: "244558748719",
  appId: "1:244558748719:web:12acdc22c9d12a68c5bada",
  measurementId: "G-2VY44XHBQ3",
  databaseURL:"https://streamspeak-81086-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db=getDatabase(app);