import styles from "./burger-ingredients.module.css";
import { Tabs } from "../tabs/tabs";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useMemo } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

function BurgerIngredients({ ingredients }) {
  const rolls = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const others = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <Tabs />
      <div className={`custom-scroll pt-10 ${styles.ingredientsContainer}`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-10 pr-2`}>
          {rolls.map((item, index) => (
            <IngredientItem count={1} item={item} key={item._id + index} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-8 pr-2`}>
          {sauces.map((item, index) => (
            <IngredientItem count={1} item={item} key={item._id + index} />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.ingredientsList} pl-4`}>
          {others.map((item, index) => (
            <IngredientItem item={item} key={item._id + index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
