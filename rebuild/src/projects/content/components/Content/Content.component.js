import React, { useEffect, useState } from "react";
import { EASY_DOM_CONTENT_WRAPPER_ID } from "../../content.constants";

import styles from "./Content.styles.scss";

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    function updateTop() {
      if (isOpen) {
        const handleMouseMove = () => {
          setIsOpen(false);
        };

        window.addEventListener("scroll", handleMouseMove);

        return () => window.removeEventListener("scroll", handleMouseMove);
      }
    },
    [isOpen]
  );

  return (
    <div
      id={EASY_DOM_CONTENT_WRAPPER_ID}
      className={styles.content_wrapper}
      style={{ top: window.scrollY, display: isOpen ? "block": "none" }} 
    >
      <p>hola</p>
    </div>
  );
};
