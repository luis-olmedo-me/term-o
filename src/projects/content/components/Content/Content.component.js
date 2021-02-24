import React, { useEffect, useState } from "react";
import { broker } from "../../../../libs/easy-broker/easyBroker.service";
import { keysManager } from "../../../../libs/easy-key-manager/KeyManager.service";
import { extensionKeyEvents } from "../../../../libs/easy-key-manager/KeysManager.constants";
import { EASY_DOM_CONTENT_WRAPPER_ID } from "../../content.constants";
import { Console } from "../Console/Console.component";

import styles from "./Content.styles.scss";

keysManager.setConnectionProvider(broker).init();

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  useEffect(
    function updateTop() {
      if (isConsoleOpen) {
        const handleMouseMove = () => {
          setIsConsoleOpen(false);
        };

        window.addEventListener("scroll", handleMouseMove);

        return () => window.removeEventListener("scroll", handleMouseMove);
      }
    },
    [isConsoleOpen]
  );

  useEffect(function openConsoleByKeyCommands() {
    keysManager.onNewCommand((command) => {
      if (command === extensionKeyEvents.OPEN_TERMINAL) {
        setIsConsoleOpen((state) => !state);
      }
    });

    return () => {};
  }, []);

  return (
    <div
      id={EASY_DOM_CONTENT_WRAPPER_ID}
      className={styles.content_wrapper}
      style={{
        top: isConsoleOpen ? window.scrollY : 0,
        opacity: isConsoleOpen ? 1 : 0,
      }}
    >
      <Console isOpen={isConsoleOpen} />
    </div>
  );
};
