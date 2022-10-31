import CartIcon from "./CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const CartCtx = useContext(CartContext);

  const [isButtonAnimated, setIsButtonAnimated] = useState(false);

  let btnClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ""}`;

  const totalCartItems = CartCtx.items.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );

  useEffect(() => {
    if (totalCartItems === 0) return;
    setIsButtonAnimated(true);
    const timerId = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [totalCartItems]);

  return (
    <button className={btnClasses} onClick={props.showModal}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
