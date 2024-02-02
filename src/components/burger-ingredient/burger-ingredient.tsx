import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredient.module.css";
import { onDelete } from "../../services/actions/ingredients-constructor-actions";
import { useDispatch } from "react-redux";
import { DropTargetOptions, useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import { IIngredient } from "../../utils/types";
import { useAppSelector } from '../../services/index';

interface IBurgerIngredientProps {
  ingridient: IIngredient;
  moveItemIngredient: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingridient, moveItemIngredient }) => {
  const id = ingridient.keyUuid;
  const { ingredients } = useAppSelector((state) => state.rootReducer.ingredientsConstructor);

  const index = ingredients.indexOf(ingridient);
  const dispatch = useDispatch();
  const onDeleteIngredient = () => {
    return dispatch(onDelete(id));
  };

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IIngredient, monitor: DropTargetOptions) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
    },
  });
  drag(drop(ref));

  return (
    <div
      className={`${burgerIngredient.ingridient__container} pl-2`}
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image_mobile}
        handleClose={() => onDeleteIngredient()}
      />
    </div>
  );
};

export default BurgerIngredient;
