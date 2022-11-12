import { useEffect, useState } from "react";

const useDishes = () => {
  const [dishesList, setDishesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchDishes = async () => {
      const result = await fetch(
        "https://rn-todo-fc0cb-default-rtdb.europe-west1.firebasedatabase.app/yapona/dishes.json"
      );

      if (!result.ok) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      const dishes = await result.json();
      const dishesList = [];

      for (const dishId in dishes) {
        if (Object.hasOwnProperty.call(dishes, dishId)) {
          const { name, description, price } = dishes[dishId];
          dishesList.push({
            id: dishId,
            name,
            description,
            price,
          });
        }
      }

      setDishesList(dishesList);
      setIsLoading(false);
      setIsError(false);
    };

    fetchDishes();
  }, []);

  return { result: dishesList, isLoading, isError };
};

export default useDishes;
