import React from "react";

import { LineInterpreter } from "./sub-components/LineInterpreter/LineInterpreter.component";

import styles from "./HistoryInterpreter.styles.scss";

export const HistoryInterpreter = ({ histories }) => {
  console.log("histories", histories);
  return (
    <div className={styles.interpreter_wrapper}>
      {histories.map((history, index) => {
        return (
          <p key={index}>
            {history.map((line) => (
              <LineInterpreter {...line} />
            ))}
          </p>
        );
      })}
    </div>
  );
};
