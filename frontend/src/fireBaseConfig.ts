import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyAmZv3qGasPVW8VyLFtgqrvuD5xyuLP1nA",
  authDomain: "sih-dods-1ee09.firebaseapp.com",
  projectId: "sih-dods-1ee09",
  storageBucket: "sih-dods-1ee09.appspot.com",
  messagingSenderId: "6777312524",
  appId: "1:6777312524:web:b38c64b58bfd4f8d94e529"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage= getStorage(app);
// const analytics = getAnalytics(app);


// document.addEventListener("DOMContentLoaded", () => {
//   const messageElement = document.createElement("div");
//   messageElement.innerText = "Firebase has been successfully connected";
//   messageElement.style.position = "fixed";
//   messageElement.style.bottom = "10px";
//   messageElement.style.right = "10px";
//   messageElement.style.backgroundColor = "green";
//   messageElement.style.color = "white";
//   messageElement.style.padding = "10px";
//   messageElement.style.borderRadius = "5px";
//   document.body.appendChild(messageElement);

 
//   setTimeout(() => {
//     document.body.removeChild(messageElement);
//   }, 10000); 
// });

export { db , storage };
