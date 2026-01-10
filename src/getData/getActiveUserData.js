import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/connect";

export async function getActiveUserData(uid) {
  if (!uid) {
    console.warn("getActiveUserData: UID is missing");
    return null;
  }

  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      console.warn("getActiveUserData: No document found for UID:", uid);
      return null;
    }

    // Return a plain object (id + data) so callers can easily consume it
    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error("getActiveUserData: failed to fetch user", error);
    return null;
  }
}

