// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbjl5HZZCAj2dtUBz7fXFO3E4sWdOfjpo",
  authDomain: "green-ai-caa5b.firebaseapp.com",
  projectId: "green-ai-caa5b",
  storageBucket: "green-ai-caa5b.firebasestorage.app",
  messagingSenderId: "1010300147368",
  appId: "1:1010300147368:web:c725ee5fd6d359403d949d",
  measurementId: "G-VE1HLDYD6Y",
};

// Initialize Firebase only if it hasn't been initialized already
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only on client side
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
