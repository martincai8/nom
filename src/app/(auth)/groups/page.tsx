"use client"

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import MiniYommer from "@/drawings/MiniYommer";
import Groups from '@/components/Groups/Groups';
import Button from '@/components/Button/Button';
import { useAuth } from '@/utility/Auth';
import { getAllGroups } from '@/utility/firebase';
import NommerGroup from '@/drawings/NommerGroup';

export default function GroupsPage() {

    const [creating, setCreating] = useState<boolean>(false);
    const [groups, setGroups] = useState<any[]>();

    const { user } = useAuth();

    async function getGroups() {
        if(!user?.email) return

        let allgroups = await getAllGroups();

        const array = allgroups.filter((g: any) => (g?.users?.map((u: any) => u?.email)).includes(user.email) );

        setGroups(array);

        console.log(array);
    }

    useEffect(() => {
        getGroups()
    }, [user])

    return !creating ? (
        <div className={styles.wrapper}>
            {/* <MiniYommer /> */}
            <div className={styles.horWrapper}>
                <h1>
                    Your groups
                </h1>
                <Button onClick={()=>setCreating(true)}>
                    Create group
                </Button>
            </div>
            <p className={styles.subText}>
                It’s looking a little lonely here. <br />Try making a new group!
            </p>
            <div>
                {groups?.map((g, index) => (
                    <div key={g}>
                       {index + 1}: {JSON.stringify(g)}
                    </div>
                ))}
            </div>
            <div className={styles.nommerGroup}>
                <NommerGroup />
            </div>
        </div>
    ) : <Groups onFinish={()=>setCreating(false)} />
}