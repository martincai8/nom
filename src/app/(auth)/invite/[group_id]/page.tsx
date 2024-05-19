"use client"

import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css'
import MiniYommer from "@/drawings/MiniYommer";
import InvitingNommer from '@/drawings/InvitingNommer';
import { useEffect, useState } from 'react';
import { getGroup } from '@/utility/firebase';
import Button from '@/components/Button/Button';

export default function GroupsPage() {

    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [group, setGroup] = useState<any>();

    const initGroup = async () => {
        if (params?.group_id) {
            console.log('hi')
            const groupInDb = await getGroup(params?.group_id as string);
            setGroup(groupInDb);
        }
        setLoading(false);
    }
    useEffect(() => {
        initGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!params.group_id) {
        return (
            <div className={styles.invalid}>
                404!
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.centre}>
                <InvitingNommer />
                <div className={styles.texts}>
                    <p>
                        You{`'`}ve been invited to join
                    </p>
                    <h1>{group?.name}</h1>
                </div>
                <div className={styles.buttons}>
                    <Button variant="outlined">
                        Decline
                    </Button>
                    <Button>
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    )
}