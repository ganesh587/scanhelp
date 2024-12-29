import React from "react";
import styles from "./styles.module.css";

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.modal_buttons}>
          <button onClick={onConfirm} className={styles.confirm_button}>
            Yes
          </button>
          <button onClick={onCancel} className={styles.cancel_button}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
