"use client"

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import MiniYommer from "@/drawings/MiniYommer";
import Groups from '@/components/Groups/Groups';
import Button from '@/components/Button/Button';
import { useAuth } from '@/utility/Auth';
import { getAllGroups } from '@/utility/firebase';

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
            <MiniYommer />
            <h1>
                My groups
            </h1>
            <div>
                {groups?.map((g, index) => (
                    <div key={g}>
                       {index + 1}: {JSON.stringify(g)}
                    </div>
                ))}
            </div>
            <Button onClick={()=>setCreating(true)}>
                Create group
            </Button>
        </div>
    ) : <Groups onFinish={()=>setCreating(false)} />
}