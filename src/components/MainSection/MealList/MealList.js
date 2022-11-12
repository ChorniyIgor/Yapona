import useDishes from "../../../hooks/useDishes";
import Card from "../../../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import Loader from "../../../UI/Loader/Loader";
import Error from "../../../UI/Error/Error";
import styles from "./MealList.module.css";

const MealList = () => {
  const { result: dishesList, isLoading, isError } = useDishes();

  const mealList = dishesList.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));

  return (
    <section className={styles.meals}>
      {isLoading && <Loader />}
      {isError && <Error>Сan't load meals</Error>}
      {!isLoading && !isError && !!dishesList.length && (
        <Card>
          <ul>{mealList}</ul>
        </Card>
      )}
    </section>
  );
};

export default MealList;
