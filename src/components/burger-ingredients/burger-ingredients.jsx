import styles from "./burger-ingredients.module.css";
import { Tabs } from "../tabs/tabs";
import React from "react";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useMemo, useEffect } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

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

  const [currentIngredient, setcurrentIngredient] = React.useState(null);

  const closeModal = () => {
    setcurrentIngredient(null);
  };

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <Tabs />
      <div className={`custom-scroll pt-10 ${styles.ingredientsContainer}`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-10 pr-2`}>
          {rolls.map((item) => (
            <IngredientItem
              count={1}
              item={item}
              key={item._id}
              onClick={setcurrentIngredient}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-8 pr-2`}>
          {sauces.map((item) => (
            <IngredientItem
              count={1}
              item={item}
              key={item._id}
              onClick={setcurrentIngredient}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.ingredientsList} pl-4`}>
          {others.map((item) => (
            <IngredientItem
              item={item}
              key={item._id}
              onClick={setcurrentIngredient}
            />
          ))}
        </ul>
      </div>

      {currentIngredient && (
        <Modal onClick={closeModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
