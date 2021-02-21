import React from "react";
import styles from "./Button.styles.scss";

export const Button = ({ className, iconBefore, iconAfter, text, onClick }) => {
  return (
    <button
      className={`
        ${styles.button}
        ${className}
      `}
      onClick={onClick}
    >
      {iconBefore}
      <span>{text}</span>
      {iconAfter}
    </button>
  );
};
