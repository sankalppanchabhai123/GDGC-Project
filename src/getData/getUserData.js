import { db } from '../firebase/connect';
import { collection, getDocs } from 'firebase/firestore';

export async function getUserData() {
    // Use a consistent cache key for the entire "team" collection
    const cacheKey = "cachedAllTeams";

    // 1. Check if data is available in localStorage
    const localData = localStorage.getItem(cacheKey);
    // if (localData) {
    //     console.log("Returning teams data from cache.");
    //     return JSON.parse(localData);
    // }

    // 2. Get a reference to the "team" collection
    const teamCollectionRef = collection(db, "user" );

    // 3. Fetch all documents from the collection
    // No need for a separate `query()` call if you're not adding `where` clauses or ordering
    const snapshot = await getDocs(teamCollectionRef);

    // 4. Format the data to include the document ID
    const formattedData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    // // 5. Store the fetched data in localStorage for future use
    localStorage.setItem(cacheKey, JSON.stringify(formattedData));

    // console.log("Fetched and cached all teams data from Firestore."); // Note: 'await' needs to be in an async context
     return formattedData;
}

// Example of how to call the function
