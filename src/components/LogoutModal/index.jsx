import React from "react";
import styles from "./styles.module.css"; 

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Are you sure you want to log out?</h2>
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

export default LogoutModal;
