"use client"

import { useEffect, useState } from 'react';
import styles from './page.module.css'
import MiniYommer from "@/drawings/MiniYommer";
import Groups from '@/components/Groups/Groups';
import Button from '@/components/Button/Button';
import { useAuth } from '@/utility/Auth';
import { getAllGroups } from '@/utility/firebase';
import NommerGroup from '@/drawings/NommerGroup';
import TwoNoms from '@/drawings/TwoNoms';

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
        getGroups();
    }, [user])

    return !creating ? (
        <div className={styles.wrapper}>
            <div className={styles.horWrapper}>
                <h1>
                    Your groups
                </h1>
                <button className={styles.createButton} onClick={()=>setCreating(true)}>
                    Create group
                </button>
            </div>
            <div className={styles.groups}>
                {groups && groups?.length > 0 ? (
                    <div className={styles.groupsInner}>
                        {groups?.map((g, index) => (
                            <div key={g} style={{display:"flex"}}> 
                                <b style={{alignSelf:"center", marginRight:"1rem"}}>
                                    {index + 1}
                                </b>
                                <div className={styles.groupPanel} key={g}>
                                    <TwoNoms />
                                    <p>{g.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.subText}>
                        It{`'`}s looking a little lonely here.
                        <br />
                        Try making a new group!
                    </p>
                )}
            </div>
            <div className={styles.nommerGroup}>
                <NommerGroup />
            </div>
        </div>
    ) : <Groups onFinish={()=>setCreating(false)} />
}