import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Message = ({ message, duration, onClose, type = "error" }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.message_bar} ${styles[type]}`}>
      <span>{message}</span>
      <button onClick={() => { setIsVisible(false); if (onClose) onClose(); }} className={styles.close_button}>X</button>
    </div>
  );
};

export default Message;
