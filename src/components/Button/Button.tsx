import styles from './Button.module.css'

interface T {
    children?: any;
    variant?: 'filled' | 'outlined';
    onClick?: any;
    disabled?: boolean;
}

export default function Button({ 
    children, 
    variant = 'filled', 
    onClick, 
    disabled = false 
}: T) {

    return (
        <button className={`${styles.b} ${styles[variant]}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}