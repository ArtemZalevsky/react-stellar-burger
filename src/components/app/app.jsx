import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { data as ingredients } from "../../utils/data";
import { useState } from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [initialIngredients, setInitialIngredients] = useState(ingredients);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className="content-container">
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={initialIngredients} />
      </main>
    </div>
  );
}

export default App;
