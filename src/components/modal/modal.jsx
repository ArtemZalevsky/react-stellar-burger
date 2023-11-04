import React, { useEffect } from 'react';
import styles from './modal.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay
 from '../ModalOverlay/modalOverlay';
const modalRoot = document.getElementById("root");

export default function Modal(props) {

    const { children, details, onClose } = props;


    const handleEscClose = (evt) => {
        if ((evt.key === 'Escape')) {
            onClose();
        }

    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose)
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        }
    })


    return ReactDOM.createPortal((
        <>
        <div className={classNames(styles['modal-block'], styles[`modal-block_${details}`], 'pt-10 pl-10 pr-10')}>
            {children}
        </div>
        <ModalOverlay onClick={onClose} />
        </>
    ), modalRoot)

}


Modal.propTypes = {
    onClose: PropTypes.func,
    details: PropTypes.string,
    children: PropTypes.elementType
}

