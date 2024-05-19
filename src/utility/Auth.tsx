"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { signOut, signInWithGoogle, onAuthChange, updateSubData, getUserOnboarded, getUser } from "@/utility/firebase"

export interface UserType {
    displayName: string | null;
    email: string | null;
    uid: string | null;
    photoUrl: string | null;
    username?: string;
    phoneNumber?: string;
}

type useAuthT = {
    user: UserType;
    siwg: any;
    logOut: any;
    setPushSub: any;
    pushSub: any;
    isOnboarded: boolean;
    setO: any;
}

const AuthContext: any = createContext(null);

export function useAuth() {
  return useContext<useAuthT>(AuthContext);
}

// Create the auth context provider
export const AuthProvider = ({
    children
}: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    const [pushSub, setS] = useState<any>();
    const [isOnboarded, setO] = useState<any>(true);

    useEffect(() => {
        const unsubscribe = onAuthChange(async (user: any) => {
            if (user) {
                const userInDb = await getUser(user.uid)
                let userInDbData = {}
                if (userInDb) {
                    userInDbData = {
                        username: userInDb?.username,
                        phoneNumber: userInDb?.phoneNumber
                    }
                    setO(userInDb.isOnboarded);
                }
                setUser({
                    photoUrl: user?.photoURL,
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    ...userInDbData
                });
                // check if user is onboarded
            } else {
                setUser(undefined);
            }
        });
        setLoading(false);
        return () => unsubscribe();
    }, []);

    async function siwg() {
      console.log('attempting siwg')
      await signInWithGoogle();
    };

    async function logOut() {
        setUser(undefined);
        await signOut();
    };

    // sets push 
    async function setPushSub(subData: any) {
        console.log('Auth.tsx: setPushSub()')
        setS(subData);
        if (subData) {
            await updateSubData(user.uid, subData);
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            siwg, 
            logOut,
            pushSub,
            setPushSub,
            isOnboarded,
            setO
        }}>
            {loading ? <>loading...</> : children}
        </AuthContext.Provider>
    );
};