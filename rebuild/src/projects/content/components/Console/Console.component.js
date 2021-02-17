import React, { useState } from "react";
import { DoubleChevronDown } from "../../../../modules/icons/DoubleChevronDown.icon";
import { Terminal } from "../../../../modules/icons/Terminal.icon";
import { Tick } from "../../../../modules/icons/Tick.icon";
import { Button } from "../../../../modules/shared-components/Button/Button.component";
import styles from "./Console.styles.scss";

export const Console = ({ isOpen }) => {
  const [histories, setHistories] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");

  const handleCommandRun = () => {
    setHistories([...histories, currentCommand]);

    setCurrentCommand("");
  };

  const handleCommandChange = (event) => {
    const newValue = event.target.value;

    setCurrentCommand(newValue);
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
            />

            <Button iconBefore={<Tick />} onClick={handleCommandRun} />
          </div>

          <textarea
            className={styles.console_history}
            value={histories.join("\n")}
            disabled
          />

          <Button
            className={styles.console_history_button}
            text="History"
            iconAfter={<DoubleChevronDown />}
          />
        </div>
      </div>
    )
  );
};
