import React, { useEffect, useRef, useState } from "react";

import terminal from "libs/easy-terminal";
import { Button } from "modules/shared-components/Button/Button.component";
import { DoubleChevronDown } from "modules/icons/DoubleChevronDown.icon";
import { Terminal } from "modules/icons/Terminal.icon";

import { commands, keywords, darkTheme, lightTheme } from "./Commands";
import styles from "./Console.styles.scss";
import { HistoryInterpreter } from "./components/HistoryInterpreter/HistoryInterpreter.component";
import { CommandInput } from "./components/CommandInput/CommandInput.component";

terminal.setValidCommands(commands);

export const Console = ({ isOpen, options, injectedData }) => {
  const [histories, setHistories] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  const handleCommandRun = () => {
    const parsedCurrentCommand = terminal.execute(currentCommand);

    setHistories([...histories, ...parsedCurrentCommand]);
    setIsHistoryOpen(true);
    setCurrentCommand("");

    setTimeout(
      () => historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight),
      0
    );
  };

  const handleCommandChange = ({ target: { value: newValue } }) => {
    setCurrentCommand(newValue);
  };

  const handleKeyPressed = (key) => {
    if (key === "enter") {
      handleCommandRun();
    }
  };

  useEffect(
    function injectCommand() {
      const injectedElement = injectedData.element || "";

      setCurrentCommand((currentCommand) => {
        return currentCommand
          ? `${currentCommand} ${injectedElement}`
          : injectedElement;
      });
    },
    [injectedData]
  );

  useEffect(
    function focusOnTheInput() {
      if (isOpen) {
        inputRef?.current?.focus();
      }
    },
    [isOpen]
  );

  return (
    isOpen && (
      <div className={styles.console_wrapper}>
        <div className={styles.console}>
          <div className={styles.console_command_input_wrapper}>
            <div className={styles.console_icon_wrapper}>
              <Terminal className={styles.console_icon} />
            </div>

            <CommandInput
              inputRef={inputRef}
              interpreterClassName={styles.console_command_input}
              placeHolder="Write your commands here!"
              onChange={handleCommandChange}
              onKeyDown={handleKeyPressed}
              value={currentCommand}
              commandKeywords={keywords}
              palette={lightTheme}
            />
          </div>

          <div className={styles.console_options}>{options}</div>

          {isHistoryOpen && (
            <HistoryInterpreter
              className={styles.console_history}
              historyRef={historyRef}
              histories={histories}
              commandKeywords={keywords}
              palette={darkTheme}
            />
          )}

          <Button
            className={styles.console_history_button}
            text="History"
            iconAfter={
              <DoubleChevronDown
                className={isHistoryOpen ? styles.inverted : ""}
              />
            }
            onClick={() => setIsHistoryOpen((state) => !state)}
          />
        </div>
      </div>
    )
  );
};
