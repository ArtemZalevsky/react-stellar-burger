import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burger-constructor.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useMemo, useCallback } from "react";
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { TotalPrice } from "../total-price/total-price";
import { useAppSelector, useAppDispatch } from '../../services/index';
import {
  addIngredients,
  addIngredientsBun,
  moveIngredientItem,
  clearConstructorIngredients,
  clearConstructorBun,
} from "../../services/actions/ingredients-constructor-actions";
import {
  postOrderFetch,
  openModalOrderDetails,
  closeModalOrderDetails,
} from "../../services/actions/order-details-actions";
import { IIngredient } from "../../utils/types";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useAppSelector(
    (state) => state.rootReducer.ingredientsConstructor
  );
  const { user } = useAppSelector(
    (state) => state.rootReducer.userReducer
  );
  const { isOpenOrder } = useAppSelector((state) => state.rootReducer.orderDetails);
  const saucesAndMains = useMemo(
    () => ingredients.filter((m) => m.type !== "bun"),
    [ingredients]
  );

  const orderIngridients: string[] = useMemo(
    () => ingredients.map((m) => m._id),
    [ingredients]
  );

  function onDropHandler(item: IIngredient) {
    if (item.type === "bun") {
      return dispatch(addIngredientsBun(item));
    } else if (item.type !== "bun") {
      return dispatch(addIngredients(item));
    }
  }

  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop(itemId: IIngredient) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  });

  const handleOpenModal = () => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      dispatch(openModalOrderDetails());
      const idBun: string = bun ? bun?._id : ''
      const allIngredients: string[] = [...orderIngridients, idBun];
      dispatch(postOrderFetch(allIngredients));
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModalOrderDetails());
    dispatch(clearConstructorIngredients());
    dispatch(clearConstructorBun());
  };

  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndMains.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const bunPrice = () => {
      if (bun) {
        return 2 * bun.price;
      } else {
        return 0;
      }
    };
    return priceIngredients + bunPrice();
  }, [saucesAndMains, bun]);

  const moveItemIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredientItem(dragIndex, hoverIndex));
    },
    [dispatch]
  );

  return (
    <div>
      <div className={`${burgerStyles.ingridient} pl-4 pb-5`} ref={drop}>
        <p className={`${burgerStyles.info} ${isActive && burgerStyles.flex}`}>Булочки сверху и снизу, соусы и начинки - посередине</p>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
        <ul className={`${burgerStyles.ingridient__list} pt-5`}>
          {ingredients.map((item) => (
            <li key={item.keyUuid} className={`${burgerStyles.ingridient__item} pb-4`}>
              <BurgerIngredient
                ingridient={item}
                moveItemIngredient={moveItemIngredient}
              />
            </li>
          ))}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
      </div>
      <div className={`${burgerStyles.order} pt-5 pr-4`}>
        <TotalPrice totalPrice={totalPrice} />
        {bun ? (
          <div className="pl-5">
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleOpenModal}
            >
              Оформить заказ
            </Button>
          </div>
        ) : (
          <div className="pl-5">
            <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
      {isOpenOrder && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
