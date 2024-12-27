// src/components/SessionExpiredModal.jsx
import React from "react";
import styles from "./styles.module.css"; // Create a CSS file for styling

const SessionExpiredModal = ({ onClose }) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Session Expired</h2>
        <p>Your session has expired. Please log in again.</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;