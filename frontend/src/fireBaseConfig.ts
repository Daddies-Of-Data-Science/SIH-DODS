import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiH3c0KZeIbt4ppBOFGiHeM8fR_Y1aSzY",
  authDomain: "sih-dods.firebaseapp.com",
  projectId: "sih-dods",
  storageBucket: "sih-dods.appspot.com",
  messagingSenderId: "159446482414",
  appId: "1:159446482414:web:8a32dcdb34497ee25822ff",
  measurementId: "G-LXY4JDXPHN"
};

// Initialize Firebase only if it has not been initialized before
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Display a message if Firebase is successfully connected
document.addEventListener("DOMContentLoaded", () => {
  const messageElement = document.createElement("div");
  messageElement.innerText = "Firebase has been successfully connected";
  messageElement.style.position = "fixed";
  messageElement.style.bottom = "10px";
  messageElement.style.right = "10px";
  messageElement.style.backgroundColor = "green";
  messageElement.style.color = "white";
  messageElement.style.padding = "10px";
  messageElement.style.borderRadius = "5px";
  document.body.appendChild(messageElement);
});

export { db };
