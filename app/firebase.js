import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEaKesEc90dvSiTHW-4DFUmlgSuB7NeY",
  authDomain: "tienda-online-9d00d.firebaseapp.com",
  projectId: "tienda-online-9d00d",
  storageBucket: "tienda-online-9d00d.firebasestorage.app",
  messagingSenderId: "718461068662",
  appId: "1:718461068662:web:b7395ca6a46ed24ae28657"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
