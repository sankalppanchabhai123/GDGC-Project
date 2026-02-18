import { db } from "../firebase/connect";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const setMemberdata = async (memberData, domain, position) => {
  if (!domain || !position) {
    throw new Error("Domain and Position are required");
  }

  try {
    const domainKey = domain.trim().toLowerCase();   // web
    const positionKey = position.trim().toLowerCase(); // coor
    let membersRef = null;

    membersRef = collection(
      db,
      "team"
    );


    // if(position == "president"){
    //     membersRef = collection(
    //     db,
    //     "team",
    //     "presidents",
    //     "members"
    //     );
    // }
    // if( (domain=="web" || domain=="cloud" || domain=="aiml" || domain=="dsa"  || domain=="android" || domain=="cs" )&& position!="president"){
    //   membersRef = collection(
    //   db,
    //   "team",
    //   "technical",
    //   domainKey,
    //   positionKey,
    //   "members"
    // );

    // }
    // if( (domain=="design" || domain=="pr" || domain=="media") && position!="president"){
    //     membersRef = collection(
    //   db,
    //   "team",
    //   "design_pr_media",
    //   domainKey,
    //   positionKey,
    //   "members"
    // );

    // }

    // if( (domain=="management" || domain=="docs" ) && position!="president"){
    //     membersRef = collection(
    //   db,
    //   "team",
    //   "management_docs",
    //   domainKey,
    //   positionKey,
    //   "members");
    // }

    

    const docRef = await addDoc(membersRef, {
      name: memberData.name,
      domain: domainKey,
      position: positionKey,
      instagram: memberData.instagram || "",
      linkedin: memberData.linkedin || "",
      github: memberData.github || "",
      imgurl: memberData.imageUrl || "",
      createdAt: serverTimestamp(),
      status: "active",
    });

    return {
      success: true,
      docId: docRef.id,
    };

  } catch (error) {
    console.error("Error saving member:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
