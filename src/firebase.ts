// src/firebase.ts
// Firebase config and initialization for Rice Dealership
// All config values are loaded from environment variables for security

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Only initialize analytics on the client
export const getAnalyticsClient = async () => {
  if (typeof window === "undefined") return null;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export const googleProvider = new GoogleAuthProvider();

// .env.local example:
// NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=eventflow-85373.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=eventflow-85373
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=eventflow-85373.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=172157267811
// NEXT_PUBLIC_FIREBASE_APP_ID=1:172157267811:web:df576a4e815f11adf1ad56
// NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-7MCKX37B03
//
// Set these in Vercel dashboard as well for production. 