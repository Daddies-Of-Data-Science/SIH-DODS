import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyCeGO_0kM2SL1IPqvbZemxsRC4MobNqd9w",
  authDomain: "sih-dods-4851f.firebaseapp.com",
  projectId: "sih-dods-4851f",
  storageBucket: "sih-dods-4851f.appspot.com",
  messagingSenderId: "518532990402",
  appId: "1:518532990402:web:0ab9bc08994251e46e025b"
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
