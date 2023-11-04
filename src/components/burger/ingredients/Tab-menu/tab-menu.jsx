import { useState } from 'react';
import styles from './tab-menu.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

export default function Tabmenu(props) {
  const [current, setCurrent] = useState('Булки');

  const scrollToElement = (element) => {
    console.log(element.current)
    element.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles['tab-menu']}>
      <Tab value="Булки" active={current === 'Булки'} onClick={() => { setCurrent('Булки'); scrollToElement(props.scrollBun) }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={() => { setCurrent('Соусы'); scrollToElement(props.scrollSauce) }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={() => { setCurrent('Начинки'); scrollToElement(props.scrollMain) }}>
        Начинки
      </Tab>
    </div>
  );
}

Tabmenu.propTypes = {
  scrollBun: PropTypes.any,
  scrollSauce: PropTypes.any,
  scrollMain: PropTypes.any
}

