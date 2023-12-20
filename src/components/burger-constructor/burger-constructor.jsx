import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burger-constructor.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useMemo, useCallback } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import TotalPrice from "../total-price/total-price";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredients,
  addIngredientsBun,
  openModalOrderDetails,
  closeModalOrderDetails,
  postOrderFetch,
  moveIngredientItem,
  clearConstructorIngredients,
  clearConstructorBun,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector(
    (state) => state.rootReducer.ingredientsConstructor
  );
  const { user } = useSelector(
    (state) => state.rootReducer.userReducer
  );
  const { isOpenOrder } = useSelector((state) => state.rootReducer.orderDetails);
  const saucesAndMains = useMemo(
    () => ingredients.filter((m) => m.type !== "bun"),
    [ingredients]
  );
  const orderIngridients = useMemo(
    () => ingredients.map((m) => m._id),
    [ingredients]
  );

  function onDropHandler(item) {
    if (item.type === "bun") {
      return dispatch(addIngredientsBun(item));
    } else if (item.type !== "bun") {
      return dispatch(addIngredients(item));
    }
  }

  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop(itemId) {
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

      const allIngredients = [...orderIngridients, bun._id];
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
      <div className={`${burgerStyles.ingridient}`} ref={drop}>
      <p className={`${burgerStyles.info} ${isActive && burgerStyles.flex}`}>Булочки сверху и снизу, соусы и начинки - посередине</p>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked="true"
            text={`${bun.name} (Верх)`}
            price={bun.price}
            thumbnail={bun.image}
            ingridient={bun}
          />
        )}
        <ul className={`${burgerStyles.ingridient__list} pt-5`}>
          {ingredients.map((item) => (
            <li key={item.uniqueId} className={`${burgerStyles.ingridient__item} pb-4`}>
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
            isLocked="true"
            text={`${bun.name} (Низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingridient={bun}
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
