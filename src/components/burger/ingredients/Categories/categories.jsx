import styles from './categories.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Tabmenu from '../tab-menu/tab-menu';
import PropTypes from 'prop-types';

export default function Categories(props) {
  return (
    <section>
      <h2 className={classNames("text text_type_main-large pt-10")}>Соберите бургер</h2>
      <div className={classNames(styles.categories, 'pt-5 pb-10')}>
        <Tabmenu scrollBun={props.scrollBun} scrollSauce={props.scrollSauce} scrollMain={props.scrollMain} />
      </div>
    </section>
  );
}

Categories.propTypes = {
  scrollBun: PropTypes.object,
  scrollSauce: PropTypes.object,
  scrollMain: PropTypes.object
}