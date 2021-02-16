import React from "react";
import styles from "./Button.styles.scss";

export const Button = ({ className, icon, text }) => {
  return (
    <button
      className={`
        ${styles.button}
        ${className}
      `}
    >
      {icon}
      {text}
    </button>
  );
};
