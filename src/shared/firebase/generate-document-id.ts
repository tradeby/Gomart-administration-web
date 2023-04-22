import {collection, doc, getFirestore} from "firebase/firestore";

export function generateDocumentId() {

    // Create a Firestore instance
    const db = getFirestore();

// Get a reference to the collection where you want to create a document
    const myCollectionRef = collection(db, "BUSINESS");

// Generate a document ID
    const newDocRef = doc(myCollectionRef);

// Get the generated document ID
    return newDocRef.id;
}
