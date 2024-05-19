"use client"

import styles from './page.module.css'
import JumpingGommer from '@/drawings/JumpingGommer';
import Button from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { getAllVisits } from '@/utility/firebase';
import { useAuth } from '@/utility/Auth';
import { useRouter } from 'next/navigation';

export default function AlertsPage() {

    const [visits, setVisits] = useState<any[]>();
    const router = useRouter();

    const { user } = useAuth();

    async function getVisits() {
        if(!user?.email) return

        let allvisits = await getAllVisits();

        const activeMeals = allvisits.filter((v: any) => (v?.groupUsers?.includes(user.uid)  && !v?.users?.includes(user.uid)))

        setVisits(activeMeals);

    }

    useEffect(() => {
        getVisits();
    }, [user])


    return (
        <div className={styles.wrapper}>
            {visits?.length && visits?.length > 0 ? (
                <div className={styles.centre}>
                    <h2>You have an active meal!</h2>
                    <JumpingGommer />
                    <div className={styles.cta}>
                        <Button onClick={()=>router.push(`/alerts/${visits[0]._id}`)}>
                            Vote now
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.centre}>
                    <h2>You currently don{`'`}t have any active meals</h2>
                    <JumpingGommer />
                    <div className={styles.cta}>
                        <p>
                            Hungry for more?
                        </p>
                        <Button>
                            Plan a meal
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}