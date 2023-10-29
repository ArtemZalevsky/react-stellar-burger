import styles from "./burger-constructor.module.css";
import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import useModal from "../../hooks/useModal";

function TotalOrder(props) {
  return (
    <div className="mr-10">
      <span className="text text_type_digits-medium mr-2">{props.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

TotalOrder.propTypes = {
  price: PropTypes.number,
};

function BurgerConstructor({ ingredients }) {
  const rolls = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const others = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={`${styles.burgerContainer} pt-25 pl-4 ml-10`}>
      <section className="pl-8">
        {rolls.map((ingredient) => (
          <div
            className={`${styles.burgerComponents} ml-6 pr-2`}
            key={ingredient._id}
          >
            <ConstructorElement
              extraClass="mt-4 mb-4"
              key={ingredient._id}
              type="top"
              isLocked={true}
              text={`${ingredient.name} (верх)`}
              price={ingredient.price}
              thumbnail={ingredient["image_mobile"]}
            />
          </div>
        ))}
      </section>
      <section className={`custom-scroll ${styles.componentsContainer}`}>
        <ul className={styles.componentsList}>
          {others.map((ingredient) => (
            <li className={`${styles.componentsItem}`} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                extraClass="mb-4"
                key={ingredient._id}
                isLocked={false}
                text={`${ingredient.name}`}
                price={ingredient.price}
                thumbnail={ingredient["image_mobile"]}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="pl-8">
        {rolls.map((ingredient) => (
          <div
            className={`${styles.burgerComponents} ml-6 pr-2`}
            key={ingredient._id}
          >
            <ConstructorElement
              key={ingredient._id}
              type="bottom"
              isLocked={true}
              text={`${ingredient.name} (низ)`}
              price={ingredient.price}
              thumbnail={ingredient["image_mobile"]}
            />
          </div>
        ))}
      </section>
      <div className={`${styles.totalWrapper} mt-10 mb-15`}>
        <TotalOrder price={610}></TotalOrder>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClick={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
