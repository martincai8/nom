import styles from './page.module.css'
import MiniYommer from "@/drawings/MiniYommer";

export default function GroupsPage() {

    return (
        <div className={styles.wrapper}>
            <h1>
                My groups
            </h1>
            <MiniYommer />
        </div>
    )
}