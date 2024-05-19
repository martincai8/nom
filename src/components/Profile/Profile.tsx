"use client"

import Image from 'next/image'
import Button from '../Button/Button'
import styles from './Profile.module.css'
import { UserType, useAuth } from '@/utility/Auth'
import { useEffect } from 'react'

const EditIcon = () => (<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 20.5C11 19.9477 11.4477 19.5 12 19.5H21C21.5523 19.5 22 19.9477 22 20.5C22 21.0523 21.5523 21.5 21 21.5H12C11.4477 21.5 11 21.0523 11 20.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 4.37891C17.7026 4.37891 17.4174 4.49705 17.2071 4.70733L4.90297 17.0115L4.37437 19.1259L6.48876 18.5973L18.7929 6.29312C18.897 6.189 18.9796 6.06538 19.036 5.92934C19.0923 5.79329 19.1213 5.64748 19.1213 5.50023C19.1213 5.35297 19.0923 5.20716 19.036 5.07112C18.9796 4.93507 18.897 4.81146 18.7929 4.70733C18.6888 4.60321 18.5652 4.52061 18.4291 4.46426C18.2931 4.40791 18.1473 4.37891 18 4.37891ZM15.7929 3.29312C16.3783 2.70776 17.1722 2.37891 18 2.37891C18.4099 2.37891 18.8158 2.45964 19.1945 2.6165C19.5732 2.77336 19.9173 3.00328 20.2071 3.29312C20.497 3.58296 20.7269 3.92705 20.8837 4.30575C21.0406 4.68444 21.1213 5.09033 21.1213 5.50023C21.1213 5.91012 21.0406 6.31601 20.8837 6.6947C20.7269 7.0734 20.497 7.41749 20.2071 7.70733L7.70711 20.2073C7.57895 20.3355 7.41837 20.4264 7.24254 20.4704L3.24254 21.4704C2.90177 21.5556 2.54128 21.4557 2.2929 21.2073C2.04452 20.959 1.94467 20.5985 2.02986 20.2577L3.02986 16.2577C3.07382 16.0819 3.16474 15.9213 3.2929 15.7931L15.7929 3.29312Z" fill="white"/>
</svg>)
const RightChevron = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.2636 3.56341C6.61508 3.21194 7.18492 3.21194 7.5364 3.56341L12.9364 8.96341C13.2879 9.31488 13.2879 9.88473 12.9364 10.2362L7.5364 15.6362C7.18492 15.9877 6.61508 15.9877 6.2636 15.6362C5.91213 15.2847 5.91213 14.7149 6.2636 14.3634L11.0272 9.5998L6.2636 4.8362C5.91213 4.48473 5.91213 3.91488 6.2636 3.56341Z" fill="black"/>
</svg>)

const keyToLabelMap: any = {
    displayName: 'Name',
    username: 'Username',
    email: 'Email',
    phoneNumber: 'Phone Number'
}

export function Settings() {

    const { logOut } = useAuth();

    return (
        <>
        <div className={styles.card}>
            <h2>Food Preferences & Restrictions</h2>
            <div className={styles.settings}>
                {['Food Preferences', 'Dietary Restrictions', 'Allergies']?.map((s) => (
                    <div className={styles.setting} key={s}>
                        {s}
                        <RightChevron />
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.info} style={{padding: '1rem 1rem'}}>
            <div className={styles.infoLabel}>
                Account
            </div>
            <div className={styles.infoValue} onClick={()=>logOut()}>
                Sign out
            </div>
        </div>
        </>
    )
}

export function Profile() {

    const { user, logOut } = useAuth();

    return (
        <div className={styles.card}>
            <div className={styles.cardTop}>
                <h2>Personal Information</h2>
                <Button square>
                    <EditIcon />
                </Button>
            </div>
            <div className={styles.details}>
                <div className={styles.pfp}>
                    <Image layout="fill" alt="Profile" src={user?.photoUrl as string} />
                </div>
                <div className={styles.profileInfo}>
                    {user && Object.keys(user)?.map((k) => (Object.keys(keyToLabelMap).includes(k)) && (
                        <div className={styles.info} key={k}>
                            <div className={styles.infoLabel}>
                                {keyToLabelMap[k]}:
                            </div>
                            <div className={styles.infoValue}>
                                {k=='username'&&'@'}{user[k as keyof UserType] || <div style={{opacity:0.3}}>Not added</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}