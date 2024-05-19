import styles from './page.module.css'
import JumpingGommer from '@/drawings/JumpingGommer';
import Button from '@/components/Button/Button';

export default function AlertsPage() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.centre}>
                <h2> You currently don{`'`}t have any active meals</h2>
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
        </div>
    )
}