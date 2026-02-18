import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

/* =======================
   FIREBASE CONFIG
======================= */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

/* =======================
   INITIALIZE FIREBASE
======================= */
let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);

  // Analytics (browser only)
  getAnalytics(app);

  console.log("🔥 Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
}

/* =======================
   EXPORTS
======================= */
export { app, db, auth };
