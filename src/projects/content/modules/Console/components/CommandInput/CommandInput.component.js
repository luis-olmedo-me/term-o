import React, { useState } from "react";

import { HistoryInterpreter } from "../HistoryInterpreter/HistoryInterpreter.component";
import styles from "./CommandInput.styles.scss";

export const CommandInput = ({
  interpreterClassName,
  inputRef,
  value,
  placeHolder,
  onChange,
  onKeyDown,
  commandKeywords,
}) => {
  const handleInputKeyDown = ({ key }) => {
    const keyInLowerCase = key.toLowerCase();

    onKeyDown(keyInLowerCase);
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
        onChange={onChange}
        onKeyDown={handleInputKeyDown}
        value={value}
      />

      <HistoryInterpreter
        className={interpreterClassName}
        histories={[[{ value: value || placeHolder, type: "command" }]]}
        commandKeywords={commandKeywords}
        onClick={enableInput}
      />
    </div>
  );
};
