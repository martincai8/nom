// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore"; 

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

// Database helpers

const userRef = collection(db, "users");

interface User {
    subscription: string;
    isOnboarded: boolean;
}

export async function updateSubData(uid: string, data: any) {
    await setDoc(doc(db, "users", uid), {
        subscription: JSON.stringify(data)
    }, { merge: true });
}

export async function getUserOnboarded(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        if (docSnap.data().isOnboarded) {
            return true;
        }
    }

    return false;
}
export async function getUser(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return false;
}
export async function handleSaveUser(uid: string, data: any) {
    await setDoc(doc(db, "users", uid), {
        ...data
    }, { merge: true });
}

export async function handleSaveGroup(uid: string, data: any) {
    // await setDoc(doc(db, "group", uid), {
    //     ...data
    // }, { merge: true });
    console.log("saving group", data);
}

export async function handleOnboardSubmit(uid: string, data: any) {
    await setDoc(doc(db, "users", uid), {
        ...data,
        isOnboarded: true
    }, { merge: true });
}

export async function getGroup(id: string) {
    const docRef = doc(db, "groups", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return false;
}

/**
 * 
 * @param uid the user casting the vote
 * @param mealId the `visit` collection item being voted to
 * @param option the option being voted on
 * @param vote being casted
 */
export async function vote(uid: string, mealId: string, option: 1 | 2 | 3, vote: boolean) {
    
}