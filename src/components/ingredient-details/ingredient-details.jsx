import PropTypes from "prop-types";
import styles from "../ingredient-details/ingredient-details.module.css";

function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.ingredientDetails}>
      <p
        className={`${styles.modalHeading} text text_type_main-large ml-10 mt-10`}
      >
        Детали ингридиента
      </p>
      <img
        src={ingredient.image}
        alt={ingredient.image}
        className={styles.ingredientDetailsPicture}
      ></img>
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
      <div
        className={`${styles.ingredientParameters} text text_type_main-default text_color_inactive`}
      >
        <p className={styles.ingredientParameter}>
          <span>Калории,ккал</span>
          <span>{ingredient.calories}</span>
        </p>
        <p className={styles.ingredientParameter}>
          <span>Белки,&nbsp;г</span>
          <span>{ingredient.proteins}</span>
        </p>
        <p className={styles.ingredientParameter}>
          <span>Жиры,&nbsp;г</span>
          <span>{ingredient.fat}</span>
        </p>
        <p className={styles.ingredientParameter}>
          <span>Углеводы,&nbsp;г</span>
          <span>{ingredient.carbohydrates}</span>
        </p>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  src: PropTypes.any,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};

export default IngredientDetails;
