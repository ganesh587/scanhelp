import React, { useState, useEffect } from "react";
import styles from "./styles.module.css"; // Assuming the styles are in this file

const ErrorMessage = ({ message, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose(); // Call onClose when duration is over
      }, duration);
      return () => clearTimeout(timer); // Cleanup timer on unmount or when duration changes
    }
  }, [duration, onClose]);

  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className={styles.error_bar}>
      <span>{message}</span>
      <button onClick={() => { setIsVisible(false); if (onClose) onClose(); }} className={styles.close_error_button}>X</button>
    </div>
  );
};

export default ErrorMessage;
