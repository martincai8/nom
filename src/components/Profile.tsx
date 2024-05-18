"use client"

import { useAuth } from "@/utility/Auth"

export default function Profile() {
    const { user, siwg, logOut } = useAuth();

    return user ? (
        <div>
            <div>
                {user.displayName}<br/>
                {user.email}<br/>
                {user.uid}
            </div>
            <div onClick={logOut}>
                Sign out
            </div>
        </div>
    ) : (
        <div onClick={siwg}>
            Sign in with google
        </div>
    )
}