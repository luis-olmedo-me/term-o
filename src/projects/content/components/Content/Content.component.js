import React, { useEffect, useState } from "react";
import { broker } from "../../../../libs/easy-broker/easyBroker.service";
import { keysManager } from "../../../../libs/easy-key-manager/KeyManager.service";
import { extensionKeyEvents } from "../../../../libs/easy-key-manager/KeysManager.constants";
import { Selection } from "../../../../modules/icons/Selection.icon";
import { Button } from "../../../../modules/shared-components/Button/Button.component";
import { EASY_DOM_CONTENT_WRAPPER_ID } from "../../content.constants";
import { Console } from "../Console/Console.component";
import { ElementSelector } from "../ElementSelector/ElementSelector.component";

import styles from "./Content.styles.scss";

keysManager.setConnectionProvider(broker).init();

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isElementSelectorActive, setIsElementSelectorActive] = useState(false);
  const [injectedCommand, setInjectedCommand] = useState({});

  const isContentActive = isConsoleOpen || isElementSelectorActive;

  useEffect(
    function updateTop() {
      if (isContentActive) {
        const handleMouseMove = () => {
          setIsConsoleOpen(false);
          setIsElementSelectorActive(false);
        };

        document.addEventListener("scroll", handleMouseMove);

        return () => document.removeEventListener("scroll", handleMouseMove);
      }
    },
    [isContentActive]
  );

  useEffect(function openConsoleByKeyCommands() {
    keysManager.onNewCommand((command) => {
      if (command === extensionKeyEvents.TOGGLE_TERMINAL) {
        setIsConsoleOpen((state) => !state);
      }
    });

    return () => {};
  }, []);

  const handleOnSelection = (selectedElement) => {
    const className = Array.from(selectedElement.classList).join(".");
    const tagName = selectedElement.tagName;

    setIsElementSelectorActive(false);
    setIsConsoleOpen(true);

    setInjectedCommand({ element: `${tagName}.${className}` });
  };

  return (
    <div
      id={EASY_DOM_CONTENT_WRAPPER_ID}
      className={styles.content_wrapper}
      style={{
        top: isContentActive ? window.scrollY : 0,
        opacity: isContentActive ? 1 : 0,
      }}
    >
      <Console
        isOpen={isConsoleOpen}
        injectedCommand={injectedCommand.element || ""}
        options={
          <Button
            className={styles.option_button}
            iconBefore={<Selection />}
            onClick={() => {
              setIsElementSelectorActive(true);
              setIsConsoleOpen(false);
            }}
          />
        }
      />

      {isElementSelectorActive && (
        <ElementSelector onSelection={handleOnSelection} />
      )}
    </div>
  );
};
