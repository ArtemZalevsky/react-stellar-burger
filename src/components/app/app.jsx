import styles from "./app.module.css";
import { useEffect, useState, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import Ingredients from "../burger/ingredients/ingredients";
import BurgerConstructor from "../burger/constructor/constructor";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { BurgerContext } from "../../services/burgerContext";
import { PriceContext } from "../../services/priceContext";
import burgerReducer from "../../services/reducers/burger";
import checkResponse from "../../utils/checkRes";

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const initialState = [];
    const [burgerElements, dispatch] = useReducer(burgerReducer, initialState);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(url)
            .then(checkResponse)
            .then((responseData) => {
                setData(responseData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Ошибка при загрузке данных:', error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <AppHeader />
            <main className={classNames(styles.main, 'mb-10')}>
                {isLoading ? (
                    console.log('Loading...')
                ) : error ? (
                    console.log(error.message)
                ) : (
                    <>
                        <PriceContext.Provider value={{ price, setPrice }}>
                            <BurgerContext.Provider value={{ burgerElements, dispatch }}>
                                <Ingredients data={data.data} />
                                <BurgerConstructor />
                            </BurgerContext.Provider>
                        </PriceContext.Provider>
                    </>
                )}
            </main>
        </>
    );
}

export default App;