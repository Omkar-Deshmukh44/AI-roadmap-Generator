// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtuk1qmtTRTSnqhX9quOkqsWvCjUF-C4c",
  authDomain: "ai-trip-plan-7e9c0.firebaseapp.com",
  projectId: "ai-trip-plan-7e9c0",
  storageBucket: "ai-trip-plan-7e9c0.firebasestorage.app",
  messagingSenderId: "777427190277",
  appId: "1:777427190277:web:e9249fd37329656995526c",
  measurementId: "G-EBSHZNWC3R"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore()