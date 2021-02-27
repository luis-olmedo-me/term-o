import React, { useEffect, useState } from "react";

import styles from "./ElementSelector.styles.scss";

export const ElementSelector = ({ isActive, onSelection }) => {
  const [coordinates, setCoordinates] = useState({});
  const [shouldHideBackground, setShouldHideBackground] = useState(false);

  useEffect(
    function listenToClicks() {
      if (isActive) {
        const callback = ({ clientX, clientY }) => {
          setCoordinates({ mousePositionX: clientX, mousePositionY: clientY });
          setShouldHideBackground(true);
        };

        document.addEventListener("click", callback, true);

        return () => document.removeEventListener("click", callback);
      }
    },
    [isActive]
  );

  useEffect(() => {
    if (isActive && shouldHideBackground) {
      const element = document.elementFromPoint(
        coordinates.mousePositionX,
        coordinates.mousePositionY
      );

      onSelection(element);
      setShouldHideBackground(false);
    }
  }, [coordinates, shouldHideBackground, isActive]);

  return (
    isActive && (
      <div
        className={styles.selector_wrapper}
        style={{ pointerEvents: shouldHideBackground ? "none" : "all" }}
      ></div>
    )
  );
};
