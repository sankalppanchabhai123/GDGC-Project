import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/connect";

/**
 * Create or update a user document in Firestore
 * @param {Object} params
 * @param {string} params.uid
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.role
 * @param {string} params.imgurl
 *
 */
export const createUserDocument = async ({
  uid,
  name,
  email,
  imgurl,
  role = "user",
}) => {
  if (!uid || !email) {
    throw new Error("UID and Email are required");
  }

  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      uid,
      name: name || "",
      email,
      role,
      imgurl: imgurl || "",
      createdAt: serverTimestamp(),
    },
    { merge: true } // 👈 prevents overwriting existing data
  );
};
