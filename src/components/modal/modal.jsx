import PropTypes from "prop-types";
import styles from "../modal/modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect } from "react";

function Modal(props) {
  const modalRoot = document.getElementById("modal");

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        props.onClick();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <>
      {createPortal(
        <>
          <div className={styles.modal}>
            <span
              onClick={props.onClick}
              className={`${styles.modalCloseIcon}`}
            >
              <CloseIcon type="primary" />
            </span>
            {props.children}
          </div>
          <ModalOverlay onClick={props.onClick} />
        </>,
        modalRoot
      )}
    </>
  );
}

Modal.propTypes = {
  onClick: PropTypes.func,
};

export default Modal;
