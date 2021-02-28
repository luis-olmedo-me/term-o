import React from "react";

import { LineInterpreter } from "./sub-components/LineInterpreter/LineInterpreter.component";

import styles from "./HistoryInterpreter.styles.scss";

export const HistoryInterpreter = ({ historyRef, histories }) => {
  console.log("histories", histories);
  return (
    <div ref={historyRef} className={styles.interpreter_wrapper}>
      {histories.map((history, historyIndex) => {
        return (
          <div key={historyIndex}>
            {history.map((line, lineIndex) => (
              <LineInterpreter key={`${historyIndex}-${lineIndex}`} {...line} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
