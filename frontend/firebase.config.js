// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArnHu3CEkbKMVeNBfJi1FLy0coAHRMeKE",
  authDomain: "sihdods.firebaseapp.com",
  projectId: "sihdods",
  storageBucket: "sihdods.appspot.com",
  messagingSenderId: "5653921433",
  appId: "1:5653921433:web:e532da0c68c37b21350208",
  measurementId: "G-PPBX7SVDEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);