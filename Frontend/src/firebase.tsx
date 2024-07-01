// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0NuVx4qZnRNmincuzDaji38l37OQK3y0",
  authDomain: "mern-auth-a3562.firebaseapp.com",
  projectId: "mern-auth-a3562",
  storageBucket: "mern-auth-a3562.appspot.com",
  messagingSenderId: "749408472211",
  appId: "1:749408472211:web:3c315cc73d75f99103d166",
  measurementId: "G-S1G3S69FJF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);