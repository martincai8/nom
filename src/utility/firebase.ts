// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8zILnvpC6YaXhKoHNLzZATBUs2Nc-6_A",
  authDomain: "nomnomnomnomnomnom.firebaseapp.com",
  projectId: "nomnomnomnomnomnom",
  storageBucket: "nomnomnomnomnomnom.appspot.com",
  messagingSenderId: "319368335728",
  appId: "1:319368335728:web:60f48f7943a4f458573fb5",
  measurementId: "G-4LXV92DV53"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// Auth helpers
export function onAuthChange(cb: any) {
    return onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}