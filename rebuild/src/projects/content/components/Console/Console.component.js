import React from "react";
import styles from "./Console.styles.scss";

export const Console = ({ isOpen }) => {
  return (
    isOpen && (
      <div className={styles.console_wrapper}>
        <div className={styles.console}></div>
      </div>
    )
  );
};
