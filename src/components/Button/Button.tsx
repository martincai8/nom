import styles from './Button.module.css'

interface T {
    children?: any;
    variant?: 'filled' | 'outlined';
    onClick?: any;
    disabled?: boolean;
    square?: boolean;
    className?: any;
    style?: any;
}

export default function Button({ 
    children, 
    variant = 'filled', 
    onClick, 
    square = false,
    disabled = false ,
    className,
    style,
}: T) {

    return (
        <button className={`${className} ${styles.b} ${styles[variant]} ${square ? styles.square : ''}`} onClick={onClick} disabled={disabled} style={style}>
            {children}
        </button>
    )
}