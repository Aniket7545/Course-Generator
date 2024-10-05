// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "course-generator-e5eb4.firebaseapp.com",
  projectId: "course-generator-e5eb4",
  storageBucket: "course-generator-e5eb4.appspot.com",
  messagingSenderId: "983724879244",
  appId: "1:983724879244:web:b9b0fa84f4a26db65b3aa9",
  measurementId: "G-CH73DBYMYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)