import CartIcon from "./CartIcon";
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    return <button className={styles.button} onClick={props.showModal}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>Cart</span>
        <span className={styles.badge}>2</span>
    </button>
}

export default HeaderCartButton;