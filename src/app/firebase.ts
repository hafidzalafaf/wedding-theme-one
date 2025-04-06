// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALbQGbaNbjxV5EEFPHlNKygOM8SsPFxEo",
  authDomain: "wedding-afifah.firebaseapp.com",
  projectId: "wedding-afifah",
  storageBucket: "wedding-afifah.firebasestorage.app",
  messagingSenderId: "546783871880",
  appId: "1:546783871880:web:d68bee5db084249ebeb03d",
  measurementId: "G-8TD9K14FHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);