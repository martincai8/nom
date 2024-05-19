import styles from './TextField.module.css'

export default function TextField({
    value,
    onChange,
    placeholder
}: {
    value: string;
    onChange: (e: any) => void;
    placeholder?: string;
}) {

    return (
        <input placeholder={placeholder} className={styles.field} type="text" value={value} onChange={onChange} />
    )
}