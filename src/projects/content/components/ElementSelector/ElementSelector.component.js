import React, { useEffect } from "react";

import styles from "./ElementSelector.styles.scss";

export const ElementSelector = ({ isActive, onSelection }) => {
  useEffect(
    function listenToClicks() {
      if (isActive) {
        const callback = (event) => {
          onSelection(event.target);
        };

        document.addEventListener("click", callback);

        return () => document.removeEventListener("click", callback);
      }
    },
    [isActive]
  );

  return isActive && <div className={styles.selector_wrapper}>holas</div>;
};
