// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiQ5tmtJubBGFX_d9KToGZ65hTCQgdKZY",
  authDomain: "yelp-fusion-c33dc.firebaseapp.com",
  projectId: "yelp-fusion-c33dc",
  storageBucket: "yelp-fusion-c33dc.appspot.com",
  messagingSenderId: "896450401547",
  appId: "1:896450401547:web:d0120e8c2e9ac636ba3e0e",
  measurementId: "G-VVPBZ4W5W4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
