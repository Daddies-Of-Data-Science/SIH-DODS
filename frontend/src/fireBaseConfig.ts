import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
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

// Optional: Display a message if Firebase is successfully connected
console.log("Firebase has been successfully connected");
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
