import React, { useState } from "react";
import { DoubleChevronDown } from "../../../../modules/icons/DoubleChevronDown.icon";
import { Terminal } from "../../../../modules/icons/Terminal.icon";
import { Tick } from "../../../../modules/icons/Tick.icon";
import { Button } from "../../../../modules/shared-components/Button/Button.component";
import styles from "./Console.styles.scss";

export const Console = ({ isOpen }) => {
  const [histories, setHistories] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");

  const handleCommandRun = () => {
    setHistories([...histories, currentCommand]);
    setIsHistoryOpen(true);
    setCurrentCommand("");
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
              placeholder="Write your commands here!"
              value={currentCommand}
              onChange={handleCommandChange}
              onKeyUp={handleKeyPressed}
            />

            <Button iconBefore={<Tick />} onClick={handleCommandRun} />
          </div>

          {isHistoryOpen && (
            <textarea
              className={styles.console_history}
              value={histories.join("\n")}
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
