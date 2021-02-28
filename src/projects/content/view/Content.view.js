import React, { useEffect, useState } from "react";

import broker from "libs/easy-broker";
import { keysManager, extensionKeyEvents } from "libs/easy-key-manager";
import { Button } from "modules/shared-components/Button/Button.component";
import { Selection } from "modules/icons/Selection.icon";

import { EASY_DOM_CONTENT_WRAPPER_ID } from "projects/content/content.constants";
import { Console } from "../modules/Console/Console.component";
import { ElementSelector } from "../modules/ElementSelector/ElementSelector.component";

import styles from "./Content.styles.scss";

keysManager.setConnectionProvider(broker).init();

export const Content = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isElementSelectorActive, setIsElementSelectorActive] = useState(false);
  const [injectedData, setInjectedData] = useState({});

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

    setInjectedData({ element: `${tagName}.${className}` });
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
        injectedData={injectedData}
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
