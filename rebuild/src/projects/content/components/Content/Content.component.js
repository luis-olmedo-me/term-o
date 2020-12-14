import React, { useEffect, useRef, useState } from "react";
import { EASY_DOM_CONTENT_ID } from "../../content.constants";

import styles from "./Content.styles.scss";

export const Content = () => {
  const [topPosition, setTopPosition] = useState(0);

  useEffect(function updateTop() {
    let animationEventId = null;

    const updatePosition = () => {
      setTopPosition(window.scrollY);

      animationEventId = window.requestAnimationFrame(updatePosition);
    };

    animationEventId = window.requestAnimationFrame(updatePosition);

    return () => window.cancelAnimationFrame(animationEventId);
  }, []);

  return (
    <div
      id={EASY_DOM_CONTENT_ID}
      className={styles.content_wrapper}
      style={{ top: topPosition }}
    >
      content
    </div>
  );
};
