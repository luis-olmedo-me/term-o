import React, { useEffect, useRef, useState } from "react";
import { terminal } from "../../../../libs/easy-terminal/easyTerminal.service";
import { DoubleChevronDown } from "../../../../modules/icons/DoubleChevronDown.icon";
import { Terminal } from "../../../../modules/icons/Terminal.icon";
import { Button } from "../../../../modules/shared-components/Button/Button.component";
import { commands } from "./Commands";
import { getLabelsFromHistories } from "./Console.helpers";
import styles from "./Console.styles.scss";

terminal.setValidCommands(commands);

export const Console = ({ isOpen }) => {
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

          {isHistoryOpen && (
            <textarea
              ref={historyRef}
              className={styles.console_history}
              value={labelsFromHistories.join("\n")}
              disabled
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
