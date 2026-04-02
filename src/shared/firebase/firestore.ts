import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
