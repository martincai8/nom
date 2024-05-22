"use client"

import TwoNoms from '@/drawings/TwoNoms';
import styles from './page.module.css'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { getGroup, getGroupVisits, getUsers } from '@/utility/firebase';


export default function GroupInfoPage() {

    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    const [group, setGroup] = useState<any>();
    const [meals, setMeals] = useState<any[]>();

    const [userMap, setUserMap] = useState<any>();

    async function fetchGroup() {
        setLoading(true);
        
        const id = params.group_id as string;
        const g = await getGroup(id);
        setGroup(g);
        const ms = await getGroupVisits(id);
        setMeals(ms);

        // this is an example of really unoptimized code
        const us = await getUsers((g as any).users?.map((uo: any) => uo.email));
        const idToUser: any = {}
        for (let i = 0; i < us.length; i++) {
            if (us[i] != null) {
                idToUser[(us[i] as any)._id] = us[i];
            }
        }
        setUserMap(idToUser);

        setLoading(false);
    }

    useEffect(() => {
        if (params.group_id && !group) {
            fetchGroup();
        }
    }, [params])

    return !loading ? (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <TwoNoms />
                    <h1>
                        {group.name}
                    </h1>
                </div>
                <div className={styles.members}>
                    <h2>
                        Members
                    </h2>
                    <div className={styles.membersList}>
                        {group?.users?.map((m: any) => (
                            <div className={styles.member} key={m.email}>
                                <div>
                                    {m.email}
                                </div>
                                <div>
                                    {m.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.meals}>
                    <h2>
                        Meals History
                    </h2>
                    <div className={styles.mealsList}>
                        {meals?.map((m: any) => m?.bookedRestaurant?.name && (
                            <div className={styles.meal} key={m._id}>
                                <div className={styles.ml}>
                                    <span style={{opacity: 0.6}}>
                                        {m?.date ? (new Date(m?.date)).toDateString().substring(4) : '(date)'}
                                    </span>
                                    <span className={styles.restaurantName}>
                                        {m?.bookedRestaurant?.name || '(restaurant)'}
                                    </span>
                                </div>
                                <div className={styles.mr}>
                                    {m?.users?.map((u: any) => (
                                        <div className={styles.avatar} key={u}>
                                            {userMap[u].email.substring(0, 1)}
                                        </div>
                                    ))}
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>
            </div>

            {/* Meal info modal */}
            <div className={styles.modal}>

            </div>
        </>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <TwoNoms />
                <h1>
                    {group?.name}
                </h1>
            </div>
        </div>
    )
}