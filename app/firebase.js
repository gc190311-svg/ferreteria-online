// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEaKesEc9OdvzSiTHW-4DFUmlgSuB7NeY",
  authDomain: "tienda-online-9d00d.firebaseapp.com",
  projectId: "tienda-online-9d00d",
  storageBucket: "tienda-online-9d00d.firebasestorage.app",
  messagingSenderId: "718461068662",
  appId: "1:718461068662:web:b7395ca6a46ed24ae28657",
  measurementId: "G-FM3ZC6ZFK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
