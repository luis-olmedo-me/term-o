import React, { useEffect, useRef, useState } from "react";

import terminal from "libs/easy-terminal";
import { Button } from "modules/shared-components/Button/Button.component";
import { DoubleChevronDown } from "modules/icons/DoubleChevronDown.icon";
import { Terminal } from "modules/icons/Terminal.icon";

import { commands } from "./Commands";
import { getLabelsFromHistories } from "./Console.helpers";
import styles from "./Console.styles.scss";
import { HistoryInterpreter } from "./components/HistoryInterpreter/HistoryInterpreter.component";

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

  const handleCommandChange = (event) => {
    const newValue = event.target.value;

    setCurrentCommand(newValue);
  };

  const handleKeyPressed = ({ key }) => {
    if (key.toLowerCase() === "enter") {
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
        inputRef.current.focus();
      }
    },
    [isOpen]
  );

  const labelsFromHistories = getLabelsFromHistories(histories);

  return (
    isOpen && (
      <div className={styles.console_wrapper}>
        <div className={styles.console}>
          <div className={styles.console_command_input_wrapper}>
            <div className={styles.console_icon_wrapper}>
              <Terminal className={styles.console_icon} />
            </div>

            <input
              className={styles.console_command_input}
              type="text"
              ref={inputRef}
              placeholder="Write your commands here!"
              value={currentCommand}
              onChange={handleCommandChange}
              onKeyUp={handleKeyPressed}
            />
          </div>

          <div className={styles.console_options}>{options}</div>

          {isHistoryOpen && (
            <HistoryInterpreter historyRef={historyRef} histories={histories} />

            // <textarea
            //   ref={historyRef}
            //   className={styles.console_history}
            //   value={<span style={{ color: "red" }}>testing</span>}
            //   disabled
            // />
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
