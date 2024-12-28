// src/components/Spinner.js
import React from "react";
import styles from "./styles.module.css"; // Import your styles

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;