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

    // const testGroups = [{key:123, name: "nwPlus n friends"}];



    return !creating ? (
        <div className={styles.wrapper}>
            {/* <MiniYommer /> */}
            <div className={styles.horWrapper}>
                <h1>
                    Your groups
                </h1>
                <button className={styles.createButton} onClick={()=>setCreating(true)}>
                    Create group
                </button>
            </div>
            {groups && groups?.length > 0 ? (
                <div>
                    
                    {groups?.map((g, index) => (
                        <div key={g} style={{display:"flex", height:"100%"}}> 
                            <b style={{alignSelf:"center", marginRight:"10px"}}>
                                {index + 1}
                            </b>
                            
                            <div className={styles.groupPanel} key={g}>
                                <div style={{display:"flex"}}>
                                    <TwoNoms />
                                    <p style={{alignSelf:"Center", marginLeft:"10px"}}>{g.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.subText}>
                    It{`'`}s looking a little lonely here. <br />Try making a new group!
                </p>
            )}
            <div className={styles.nommerGroup}>
                <NommerGroup />
            </div>
        </div>
    ) : <Groups onFinish={()=>setCreating(false)} />
}