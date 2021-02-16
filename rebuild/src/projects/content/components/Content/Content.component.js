import React, { useEffect, useState } from "react";
import { keysManager } from "../../../../libs/easy-key-manager/KeyManager.service";
import { EASY_DOM_CONTENT_WRAPPER_ID } from "../../content.constants";
import { Console } from "../Console/Console.component";

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

  useEffect(function openConsoleByKeyCommands() {
    const openConsole = () => {
      setIsOpen((state) => !state);
    };

    const openKeyEventId = keysManager.on("alt+t", openConsole);

    return () => keysManager.off(openKeyEventId);
  }, []);

  return (
    <div
      id={EASY_DOM_CONTENT_WRAPPER_ID}
      className={styles.content_wrapper}
      style={{ top: window.scrollY, opacity: isOpen ? 1 : 0 }}
    >
      <Console isOpen={isOpen} />
    </div>
  );
};
