import styles from './Countdown.module.css'

export default function Countdown({ until, children }: { until?: any, children?: any }) {


    return (
        <div className={styles.container}>
            {children || until}
        </div>
    )
}