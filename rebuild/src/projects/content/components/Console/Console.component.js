import React from "react";
import styles from "./Console.styles.scss";

export const Console = ({ isOpen }) => {
  return isOpen && <div>Console</div>;
};
