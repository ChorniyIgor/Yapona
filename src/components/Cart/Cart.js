import { useContext } from "react";
import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItems = cartCtx.items;

  const hasItems = cartItems.length !== 0;

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  return (
    <div>
      <ul className={styles["cart-items"]}>
        {cartItems.map((item) => (
          <CartItem
            item={item}
            key={item.id}
            onRemove={removeCartItemHandler.bind(null, item.id)}
            onAdd={addCartItemHandler.bind(null, item)}
          />
        ))}
      </ul>

      <div className={styles.total}>
        <span>Total</span>
        <span>{`$${cartCtx.totalAmount}`}</span>
      </div>

      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.hideModal}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </div>
  );
};

export default Cart;
