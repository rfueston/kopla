// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_PhnQjxwx3ufu9OpiKLzP_jkEceMQ3JU",
  authDomain: "kopla-16b18.firebaseapp.com",
  projectId: "kopla-16b18",
  storageBucket: "kopla-16b18.appspot.com",
  messagingSenderId: "848468221188",
  appId: "1:848468221188:web:7fbdbacd47e6a4f2788451",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
