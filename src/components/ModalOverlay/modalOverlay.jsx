import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';
const modalRoot = document.getElementById("root");

export default function ModalOverlay(props) {

    const { onClick } = props;

    const handleOverplayClose = (event) => {
        if (event.target.classList.contains(`${styles.overlay}`)) {
            onClick();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOverplayClose)
        return () => {
            document.removeEventListener('click', handleOverplayClose)
        }
    })

    return ReactDOM.createPortal(
        (
            <div className={styles.overlay}>
            </div>
        ), modalRoot

    )

}


ModalOverlay.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.elementType
}