import React from "react";
import styles from "./Button.styles.scss";

export const Button = ({ className, iconBefore, iconAfter, text }) => {
  return (
    <button
      className={`
        ${styles.button}
        ${className}
      `}
    >
      {iconBefore}
      {text}
      {iconAfter}
    </button>
  );
};
