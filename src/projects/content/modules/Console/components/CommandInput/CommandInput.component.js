import React, { useRef, useState } from "react";

import { HistoryInterpreter } from "../HistoryInterpreter/HistoryInterpreter.component";
import styles from "./CommandInput.styles.scss";

export const CommandInput = ({ interpreterClassName }) => {
  const [command, setCommand] = useState("dom-get a");

  const inputRef = useRef(null);

  const handleCommandChange = ({ target: { value } }) => {
    setCommand(value);
  };

  const enableInput = () => {
    inputRef?.current?.focus();
  };

  return (
    <div className={styles.input_wrapper}>
      <input
        className={styles.input}
        ref={inputRef}
        type="text"
        onChange={handleCommandChange}
        onFocusCapture={(event) => console.log(event)}
        value={command}
      />

      <HistoryInterpreter
        className={interpreterClassName}
        histories={[[{ value: command, type: "command" }]]}
        commandKeywords={["dom-get"]}
        onClick={enableInput}
      />
    </div>
  );
};
