import React from "react";
import { Terminal } from "../../../../modules/icons/Terminal.icon";
import { Tick } from "../../../../modules/icons/Tick.icon";
import { Button } from "../../../../modules/shared-components/Button/Button.component";
import styles from "./Console.styles.scss";

export const Console = ({ isOpen }) => {
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
            />

            <Button icon={<Tick />} />
          </div>

          <div className={styles.console_history_wrapper}>
            <textarea className={styles.console_history} value="git status" />

            <Button
              className={styles.console_history_button}
              text="toggle history"
            />
          </div>
        </div>
      </div>
    )
  );
};
