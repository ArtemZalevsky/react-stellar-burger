import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useState, useEffect } from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    data: [],
  });
  useEffect(() => {
    const initialIngredients = () => {
      setState({ ...state, isLoading: true });
      fetch(`${url}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((object) => {
          setState({ data: object.data, isLoading: false });
        })
        .catch((error) => console.log(error));
    };
    initialIngredients();
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className="content-container">
        {!state.isLoading && state.data.length && (
          <>
            <BurgerIngredients ingredients={state.data} />
            <BurgerConstructor ingredients={state.data} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
