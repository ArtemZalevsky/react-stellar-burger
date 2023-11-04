import { } from '@ya.praktikum/react-developer-burger-ui-components'
import Info from './Info/info';
import FoodItems from './Food-Items/food-items';

function BurgerConstructor() {
    return (
        <section>
            <FoodItems />
            <Info />
        </section>
    )
}

export default BurgerConstructor;
