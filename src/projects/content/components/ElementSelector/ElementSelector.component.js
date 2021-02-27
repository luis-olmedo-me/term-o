import React, { useEffect, useState } from "react";

import styles from "./ElementSelector.styles.scss";

export const ElementSelector = ({ onSelection }) => {
  const [coordinates, setCoordinates] = useState({});
  const [shouldHideBackground, setShouldHideBackground] = useState(false);

  useEffect(function listenToClicks() {
    const callback = ({ clientX, clientY }) => {
      setCoordinates({ mousePositionX: clientX, mousePositionY: clientY });
      setShouldHideBackground(true);
    };

    document.addEventListener("click", callback);

    return () => document.removeEventListener("click", callback);
  }, []);

  useEffect(
    function findElementFromCoordinates() {
      if (shouldHideBackground) {
        const element = document.elementFromPoint(
          coordinates.mousePositionX,
          coordinates.mousePositionY
        );

        onSelection(element);
        setShouldHideBackground(false);
      }
    },
    [coordinates, shouldHideBackground]
  );

  return (
    <div
      className={styles.selector_wrapper}
      style={{ pointerEvents: shouldHideBackground ? "none" : "all" }}
    ></div>
  );
};
