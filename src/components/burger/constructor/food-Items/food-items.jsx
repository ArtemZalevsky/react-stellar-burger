import { useContext, useEffect, useState } from 'react';
import styles from './food-items.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { BurgerContext } from '../../../../services/burgerContext';
import RenderItemsOfType from '../../renderItems-of-type/renderItems-of-type';
import { PriceContext } from '../../../../services/priceContext';

export default function FoodItems() {

    const { burgerElements } = useContext(BurgerContext);
    const [constructorTop, setConstructorTop] = useState(null);
    const [constructorMain, setConstructorMain] = useState([]);
    const [constructorBottom, setConstructorBottom] = useState(null);
    const { setPrice } = useContext(PriceContext);

    useEffect(() => {

        let burgerElement = burgerElements[burgerElements.length - 1];

        if (burgerElements && burgerElements.length > 0) {
            if (burgerElement.type === 'bun') {
                setConstructorTop(<RenderItemsOfType
                    data={burgerElements}
                    burger={'const'}
                    type='bun'
                    location='top'
                    styles={styles}
                    isLocked={true}
                    extraClass={'ml-8'}
                    position={'(Верх)'}
                    key={burgerElements.id}
                />);

                setPrice((prevPrice) => prevPrice + burgerElement.price);

                setConstructorBottom(<RenderItemsOfType
                    data={burgerElements}
                    burger={'const'}
                    type='bun'
                    location='bottom'
                    styles={styles}
                    isLocked={true}
                    extraClass={'ml-8'}
                    position={'(Низ)'}
                    key={burgerElements.id}
                />);

                setPrice((prevPrice) => prevPrice + burgerElement.price);
            } else {
                setConstructorMain(prevConstructorMain => {
                    return [
                        ...prevConstructorMain,
                        <RenderItemsOfType
                            data={burgerElements}
                            burger={'const'}
                            type='main'
                            location='main'
                            styles={styles}
                            extraClass={'ml-2'}
                            isLocked={false}
                            position={''}
                            key={burgerElements.id}
                        />
                    ];
                });
                setPrice((prevPrice) => prevPrice + burgerElement.price);
            }
        }

    }, [burgerElements])

    return (
        <div className={styles['items-block']}>
            <div className={classNames(styles['item-block'], 'mt-25', styles['top-items'])}>
                {constructorTop}
            </div>
            <div className={classNames(styles['item-block'], styles['main-items'], 'custom-scroll pr-3')}>
                {constructorMain}
            </div>
            <div className={classNames(styles['item-block'], 'mt-4', styles['bottom-items'])}>
                {constructorBottom}
            </div>
        </div>
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
    data: itemPropTypes
}