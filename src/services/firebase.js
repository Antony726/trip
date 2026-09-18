import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtkev0vVhQ7-wxiIKUCcHTy3NE1EA9IMg",
  authDomain: "ooty-820cc.firebaseapp.com",
  projectId: "ooty-820cc",
  storageBucket: "ooty-820cc.firebasestorage.app",
  messagingSenderId: "445884904089",
  appId: "1:445884904089:web:57dd107ee3fa87c188fe08",
  measurementId: "G-10RYKGM574",
  databaseURL: "https://ooty-820cc-default-rtdb.firebaseio.com" // Fallback RTDB URL if using RTDB
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
