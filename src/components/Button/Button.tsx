import styles from './Button.module.css'

interface T {
    children?: any;
    variant?: 'filled' | 'outlined';
    onClick?: any;
    disabled?: boolean;
    square?: boolean;
}

export default function Button({ 
    children, 
    variant = 'filled', 
    onClick, 
    square = false,
    disabled = false 
}: T) {

    return (
        <button className={`${styles.b} ${styles[variant]} ${square ? styles.square : ''}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}