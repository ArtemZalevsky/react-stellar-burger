import PropTypes from "prop-types";
import styles from "../modal-overlay/modal-overlay.module.css";

function ModalOverlay(props) {
  return <div onClick={props.onClick} className={styles.popup}></div>;
}
ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};

export default ModalOverlay;
