import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Button from "../../UI/Button/Button";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import OrderForm from "./OrderForm/OrderForm";
import Loader from "../../UI/Loader/Loader";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isUserInfoShown, setIsUserInfoShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartItems = cartCtx.items;
  const hasItems = cartItems.length !== 0;

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onOrderClickHandler = (evt) => {
    evt.preventDefault();
    setIsUserInfoShown(true);
  };

  const onSubmitOrderHandler = async (userData) => {
    const data = {
      user: userData,
      meals: cartItems,
      status: "in process",
    };

    setIsError(false);
    setIsLoading(true);
    const result = await fetch(
      "https://rn-todo-fc0cb-default-rtdb.europe-west1.firebasedatabase.app/yapona/orders.json",

      {
        method: "POST",
        headers: "Content-Type: application/json",
        body: JSON.stringify(data),
      }
    );

    if (!result.ok) {
      setIsError(true);
      return;
    }
    const respData = await result.json();
    setIsLoading(false);
    setIsSuccess(true);
    cartCtx.removeAllItems();

    console.log(respData);
  };

  if (isError) {
    return (
      <>
        <p>
          We are unable to send your order. Please try again in a few minutes
        </p>
        <div className={styles.actions}>
          <Button onClick={props.hideModal} viewstyle="alt">
            Close
          </Button>
        </div>
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    return (
      <>
        <p>The order was sending successfully.</p>
        <div className={styles.actions}>
          <Button onClick={props.hideModal} viewstyle="alt">
            Close
          </Button>
        </div>
      </>
    );
  }

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

      {isUserInfoShown ? (
        <OrderForm
          hideModal={props.hideModal}
          onSubmitOrderHandler={onSubmitOrderHandler}
        />
      ) : (
        <div className={styles.actions}>
          <Button onClick={props.hideModal} viewstyle="alt">
            Close
          </Button>
          {hasItems && <Button onClick={onOrderClickHandler}>Order</Button>}
        </div>
      )}
    </div>
  );
};

export default Cart;
