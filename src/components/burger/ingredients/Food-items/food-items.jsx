import { useContext, useState } from 'react';
import styles from './food-items.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../../Modal/modal';
import IngredientDetails from '../../../IngredientDetails/IngredientDetails';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { BurgerContext } from '../../../../services/burgerContext';
import { ADD_BUN, ADD_MAIN } from '../../../../services/actions/burger';

export default function FoodItems(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { burgerElements, dispatch } = useContext(BurgerContext);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const addItem = (element) => {

        const bunElement = burgerElements.find((el) => el.type === 'bun');

        if (element.type === 'bun') {
            if (bunElement === undefined) {
                dispatch({ element, type: ADD_BUN });
            }
        } else {
            dispatch({ type: ADD_MAIN, element });
        }
    }

    const renderItemsOfType = (type) => {

        const filterType = props.data.filter((element) => element.type === type);

        let items = filterType.map((element) => {
            return (
                <div className={classNames(styles.item)} key={element.id} onClick={() => addItem(element)}>
                    <img className={classNames(styles.item__image, 'ml-3 mr-3')} src={element.image} alt={element.name} />
                    <div className={classNames(styles.item__price, 'mt-1 mb-1')}>
                        <p className={classNames('text text_type_digits-default', 'pr-2', styles.item__priceInfo)}>
                            {element.price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={classNames("text text_type_main-default", styles.item__itemInfo)}>
                        {element.name}
                    </p>
                    <Counter count={1} size="default" extraClass="m-1" />
                </div>
            )
        })

        return items;
    }

    return (
        <section className={classNames('custom-scroll', styles['food-items'])}>
            <div ref={props.scrollBun}>
                <h2 className={classNames("text text_type_main-large")}>Булки</h2>
                <section className={styles.items}>
                    {renderItemsOfType('bun')}
                </section>
            </div>

            <div ref={props.scrollSauce} className={"mt-10"}>
                <h2 className={classNames("text text_type_main-large")}>Соусы</h2>
                <section className={styles.items}>
                    {renderItemsOfType("sauce")}
                </section>
            </div>

            <div ref={props.scrollMain} className={"mt-10"}>
                <h2 className={classNames("text text_type_main-large")}>Начинки</h2>
                <section className={styles.items}>
                    {renderItemsOfType('main')}
                </section>
            </div>

            {isModalOpen && (
                <>
                    <Modal onClose={closeModal} details={'ingridients'}>
                        <IngredientDetails onClose={closeModal} description={selectedItem} />
                    </Modal>
                </>
            )
            }
        </section>
    )
}

const itemPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
});

FoodItems.propTypes = {
    data: PropTypes.arrayOf(itemPropTypes),
    scrollBun: PropTypes.object,
    scrollSauce: PropTypes.object,
    scrollMain: PropTypes.object
}