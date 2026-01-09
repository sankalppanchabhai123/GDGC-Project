import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc } from "firebase/firestore";


if (!process.env.REACT_APP_projectId) {
  console.error("❌ ENV not loaded properly (.env issue)");
} else {
  console.log("✅ ENV variables loaded correctly");
}

/* =======================
   2️⃣ FIREBASE CONFIG
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
   3️⃣ INITIALIZE FIREBASE
======================= */
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  console.log("🔥 Firebase initialized successfully");

  db = getFirestore(app);
  console.log("📦 Firestore instance created");

  // Analytics (only works in browser)
  getAnalytics(app);

} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
}

/* =======================
   4️⃣ FIRESTORE CONNECTION TEST
======================= */
const checkFirestoreConnection = async () => {
  try {
    const testRef = doc(db, "test", "connection"); // create this doc once
    await getDoc(testRef);

    console.log("🟢 Firestore CONNECTED (online)");
  } catch (error) {
    console.error("🔴 Firestore NOT connected:", error.message);
  }
};

checkFirestoreConnection();

/* =======================
   EXPORT DB
======================= */
export { db };
