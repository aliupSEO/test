import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAxautfmx6081qEL2km8H9qfba503ryMa0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "my-new-app-bb229.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "my-new-app-bb229",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "my-new-app-bb229.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "607370353270",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:607370353270:web:8cd30b78d212fb38d91d57"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
