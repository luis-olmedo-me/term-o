import React from "react";

import styles from "./ElementSelector.styles.scss";

export const ElementSelector = ({ isActive }) => {
  return isActive && <div className={styles.selector_wrapper}>holas</div>;
};
