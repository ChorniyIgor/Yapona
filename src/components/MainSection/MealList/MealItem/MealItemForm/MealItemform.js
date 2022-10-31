import Input from "../../../../../UI/Input/Input";
import styles from "./MealItemForm.module.css";
import CartContext from "../../../../../store/cart-context";
import { useContext, useState } from "react";

const MealItemForm = (props) => {
  const CartCtx = useContext(CartContext);

  const [mealCount, setMealCount] = useState(1);
  const [isInputValid, setisInputValid] = useState(true);

  const onAddButtonClickHandler = (evt) => {
    evt.preventDefault();
    CartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      description: props.meal.description,
      price: props.meal.price,
      amount: mealCount,
    });
  };

  const itemId = CartCtx.items.findIndex((item) => item.id === props.meal.id);
  let isAddBtnEnabled = true;
  let maxCountOfMeals = 10;
  if (itemId !== -1) {
    isAddBtnEnabled = CartCtx.items[itemId].amount < 10;
    maxCountOfMeals = 10 - CartCtx.items[itemId].amount;
  }

  const onMealCountChangeHandler = (evt) => {
    if (
      evt.target.value.trim().length < 1 ||
      +evt.target.value < 1 ||
      +evt.target.value > 10
    ) {
      setisInputValid(false);
      return;
    }
    setMealCount(+evt.target.value);
    setisInputValid(true);
  };

  return (
    <form className={styles.form}>
      <Input
        customClass={styles.input}
        label="Count"
        input={{
          value: mealCount,
          type: "number",
          id: props.meal.id,
          min: 0,
          max: maxCountOfMeals,
          step: 1,
          onChange: onMealCountChangeHandler,
        }}
      />
      {!isInputValid && <p>Please enter a count from 1 to 10</p>}
      <button disabled={!isAddBtnEnabled} onClick={onAddButtonClickHandler}>
        Add
      </button>
    </form>
  );
};

export default MealItemForm;
