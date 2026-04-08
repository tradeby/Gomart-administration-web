import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, EmulatorMockTokenOptions } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDo0KVqGLzCqIUks4a8UJSuAJSW_k3ec3o",
    authDomain: "gomart-apps.firebaseapp.com",
    projectId: "gomart-apps",
    storageBucket: "gomart-apps.appspot.com",
    messagingSenderId: "1066738259998",
    appId: "1:1066738259998:web:ee0b7945df0a14b7a3760f",
    measurementId: "G-J1MLYY53KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8099);
export {db}
const auth = getAuth(app);
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
export {auth}
export const storage = getStorage(app);
