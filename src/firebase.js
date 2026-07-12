// src/firebase.js
//
// Central Firebase setup. All config comes from environment variables
// (see .env.example) so nothing secret-ish is hardcoded in source.
//
// NOTE: Firebase "web config" values are not truly secret - they identify
// your project, not authenticate as an admin. Real protection comes from
// Firestore/Storage security rules (see firestore.rules / storage.rules)
// plus Firebase Auth gating the admin panel. Still, we keep them in env
// vars rather than hardcoded so they're easy to change per-environment
// and don't get committed by accident if you ever change your mind.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  // Loud console warning rather than a silent blank site - much easier to
  // debug a missing .env than a mysteriously empty page.
  console.warn(
    "[firebase.js] Missing REACT_APP_FIREBASE_* environment variables. " +
      "The site will fall back to static content. See .env.example."
  );
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// Note: Firebase Storage is intentionally not used here. As of Feb 2026,
// Firebase requires the paid Blaze plan just to provision a Storage
// bucket. File uploads (photos, certificates, club logos, CV) instead go
// through Cloudinary's free plan - see src/utils/uploadImage.js. You can
// ignore/delete storage.rules, it's no longer used.
export default app;
