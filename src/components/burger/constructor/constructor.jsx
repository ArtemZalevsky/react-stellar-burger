import { } from '@ya.praktikum/react-developer-burger-ui-components'
import Info from './info/info';
import FoodItems from './food-Items/food-items';

function BurgerConstructor() {
    return (
        <section>
            <FoodItems />
            <Info />
        </section>
    )
}

export default BurgerConstructor;
