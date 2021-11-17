import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
//import { isPropertyAccessChain } from "typescript";
// dot env local must be in  your root folder
const app = firebase.initializeApp({ 
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});



export const auth = app.auth(); 
export const firestore = app.firestore();//.collection("ChatBackTest").get(); 
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const deleteFirestore = firebase.firestore.FieldValue.delete();
console.log('firebase is ',auth);
export default app;

