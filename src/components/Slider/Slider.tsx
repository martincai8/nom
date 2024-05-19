import styles from './Slider.module.css'

export default function Slider({value, max}: {
    value: number,
    max: number
}) {
    
    return (
        <div className={styles.stepper}>
            <div className={styles.progress} style={{
                width: `${(value / max) * 100}%`,
            }}></div>
        </div>
    )
}