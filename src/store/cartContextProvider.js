import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (prevState, action) => {
  if (action.type === "ADD_NEW_ITEM_TO_CART") {
    const totalAmount = (
      +prevState.totalAmount +
      action.item.amount * action.item.price
    ).toFixed(2);

    const currElementId = prevState.items.findIndex(
      (item) => action.item.id === item.id
    );

    let currElementData;
    const newCartItems = [...prevState.items];
    if (currElementId !== -1) {
      let newAmount =
        prevState.items[currElementId].amount + action.item.amount;
      if (newAmount > 10) newAmount = 10;

      currElementData = {
        ...prevState.items[currElementId],
        amount: newAmount,
      };
      newCartItems[currElementId] = currElementData;
    } else {
      currElementData = { ...action.item };
      newCartItems.push(currElementData);
    }

    return {
      ...prevState,
      items: newCartItems,
      totalAmount: totalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM_FROM_CART") {
    const currElementId = prevState.items.findIndex(
      (item) => item.id === action.itemId
    );

    const newItemsList = [...prevState.items];
    let totalAmount = +prevState.totalAmount;

    if (currElementId !== -1) {
      newItemsList[currElementId] = {
        ...prevState.items[currElementId],
        amount: prevState.items[currElementId].amount - 1,
      };
      totalAmount = (
        +prevState.totalAmount - prevState.items[currElementId].price
      ).toFixed(2);
    }

    if (newItemsList[currElementId].amount === 0) {
      newItemsList.splice(currElementId, 1);
    }

    return {
      ...prevState,
      items: newItemsList,
      totalAmount,
    };
  }
  if (action.type === "REMOVE_ALL_ITEMS_FROM_CART") {
    return {
      ...prevState,
      items: [],
      totalAmount: 0,
    };
  }

  return { ...prevState };
};

const CartContextProvider = (props) => {
  const addItem = (item) => {
    dispatchCartState({
      type: "ADD_NEW_ITEM_TO_CART",
      item,
    });
  };

  const removeItem = (itemId) => {
    dispatchCartState({
      type: "REMOVE_ITEM_FROM_CART",
      itemId,
    });
  };

  const removeAllItems = () => {
    dispatchCartState({
      type: "REMOVE_ALL_ITEMS_FROM_CART",
    });
  };

  const [cartState, dispatchCartState] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const inintialState = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    removeAllItems,
  };

  return (
    <CartContext.Provider value={inintialState}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
