// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "expo-app-c47f2.firebaseapp.com",
  projectId: "expo-app-c47f2",
  storageBucket: "expo-app-c47f2.firebasestorage.app",
  messagingSenderId: "689876000966",
  appId: "1:689876000966:web:64d1986d76c1a6b566b7c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)