import React from "react";
import styles from "./Console.styles.scss";

export const Console = ({ isOpen }) => {
  return (
    isOpen && (
      <div className={styles.console_wrapper}>
        <div className={styles.console}>
          <div className={styles.console_command_input_wrapper}>
            <input className={styles.console_command_input} type="text" placeholder="Write your commands here!"/>

            <button className={styles.console_command_button}>Save</button>
          </div>
        </div>
      </div>
    )
  );
};
