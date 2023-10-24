import { Firebase, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
const FirebaseCredentials = {
  apiKey: "AIzaSyC_PhnQjxwx3ufu9OpiKLzP_jkEceMQ3JU",
  authDomain: "kopla-16b18.firebaseapp.com",
  projectId: "kopla-16b18",
  storageBucket: "kopla-16b18.appspot.com",
  messagingSenderId: "848468221188",
  appId: "1:848468221188:web:7fbdbacd47e6a4f2788451"
};
// if a Firebase instance doesn't exist, create one
const app = initializeApp(FirebaseCredentials);

export const auth = getAuth(app);
