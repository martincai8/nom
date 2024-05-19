import { Settings, Profile } from '@/components/Profile/Profile';
import styles from './page.module.css'
import MiniYommer from "@/drawings/MiniYommer";

export default function ProfilePage() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h1>My Profile </h1>
                <MiniYommer />
            </div>
            <div className={styles.cards}>
                <Profile />
                <Settings />
            </div>
        </div>
    )
}