import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";

// Firebase Web SDK Configuration (read from environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDtkev0vVhQ7-wxiIKUCcHTy3NE1EA9IMg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ooty-820cc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ooty-820cc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ooty-820cc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "445884904089",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:445884904089:web:57dd107ee3fa87c188fe08",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-10RYKGM574",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://ooty-820cc-default-rtdb.firebaseio.com"
};

let app;
let firestoreDb;
let realtimeDb;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  firestoreDb = getFirestore(app);
  try {
    realtimeDb = getDatabase(app);
  } catch(e) {}
} catch (err) {
  console.warn("Firebase init info:", err);
}

export { app, firestoreDb, realtimeDb, collection, addDoc, onSnapshot, deleteDoc, doc, setDoc, ref, set, onValue, remove };
