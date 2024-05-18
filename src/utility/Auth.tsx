"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { signOut, signInWithGoogle, onAuthChange } from "@/utility/firebase"

// TODO: User data type interface
interface UserType {
    displayName: string | null;
    email: string | null;
    uid: string | null;
}

type useAuthT = {
    user: UserType;
    siwg: any;
    signOut: any;
}

const AuthContext: any = createContext(null);

export function useAuth() {
  return useContext(AuthContext) as { user: any, siwg: any, logOut: any };
}

// Create the auth context provider
export const AuthProvider = ({
    children
}: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthChange((user: any) => {
            if (user) {
                console.log(user);
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid
                });
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

    return (
        <AuthContext.Provider value={{ 
            user, 
            siwg, 
            logOut 
        }}>
            {loading ? <>loading...</> : children}
            {/* {children} */}
        </AuthContext.Provider>
    );
};