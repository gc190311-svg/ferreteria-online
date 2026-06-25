import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEaKesEc9OdvzSiTHW-4DFUmlgSuB7NeY",
  authDomain: "tienda-online-9d00d.firebaseapp.com",
  projectId: "tienda-online-9d00d",
  storageBucket: "tienda-online-9d00d.firebasestorage.app",
  messagingSenderId: "718461068662",
  appId: "1:718461068662:web:b7395ca6a46ed24ae28657",
  measurementId: "G-FM3ZC6ZFK2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
