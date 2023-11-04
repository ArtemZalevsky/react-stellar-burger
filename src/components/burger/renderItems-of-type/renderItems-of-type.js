import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function RenderItemsOfType(props) {
    let items;

    if (props.burger === 'ingrediens') {
        const filterType = props.data.filter((element) => element.type === props.type);

        items = filterType.map((element) => {
            return (
                <div className={classNames(props.styles.item)} key={element.id} onClick={() => props.openModal(element)}>
                    <img className={classNames(props.styles.item__image, 'ml-3 mr-3')} src={element.image} alt={element.name} />
                    <div className={classNames(props.styles.item__price, 'mt-1 mb-1')}>
                        <p className={classNames('text text_type_digits-default', 'pr-2', props.styles.item__priceInfo)}>
                            {element.price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={classNames("text text_type_main-default", props.styles.item__itemInfo)}>
                        {element.name}
                    </p>
                    <Counter count={1} size="default" extraClass="m-1" />
                </div>
            )
        })
    }
    else {

        let constructorElement = null;
        if (props.data.length > 0) {
            constructorElement = props.data[props.data.length - 1];
        }

        items = <div className={classNames(props.styles.item, {
            'mt-4': constructorElement && constructorElement.type !== 'bun',
        })}>
            {constructorElement && constructorElement.type !== 'bun' ? <DragIcon type="primary" /> : null}
            <ConstructorElement
                type={props.location}
                isLocked={props.isLocked}
                text={`${constructorElement && constructorElement.name} ${props.position}`}
                price={constructorElement && constructorElement.price}
                thumbnail={constructorElement && constructorElement.image}
                extraClass={constructorElement && props.extraClass}
            />
        </div>
    }
    return items;
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

RenderItemsOfType.propTypes = {
    data: itemPropTypes,
    burger: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    styles: PropTypes.string,
    extraClass: PropTypes.string,
    isLocked: PropTypes.bool
}