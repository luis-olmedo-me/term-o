import React, { useState } from "react";

import { HistoryInterpreter } from "../HistoryInterpreter/HistoryInterpreter.component";
import styles from "./CommandInput.styles.scss";

export const CommandInput = ({ interpreterClassName }) => {
  const [command, setCommand] = useState("dom-get a");

  const handleCommandChange = ({ target: { value } }) => {
    setCommand(value);
  };

  const handleKeyDown = (event) => {
    console.log("event", event);
  };

  return (
    <div className={styles.input_wrapper}>
      <input
        className={styles.input}
        type="text"
        onChange={handleCommandChange}
        onKeyDown={handleKeyDown}
        value={command}
      />

      <HistoryInterpreter
        className={interpreterClassName}
        histories={[[{ value: command, type: "command" }]]}
        commandKeywords={["dom-get"]}
      />
    </div>
  );
};
