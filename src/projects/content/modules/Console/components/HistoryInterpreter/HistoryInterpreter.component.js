import React from "react";

import { LineInterpreter } from "./sub-components/LineInterpreter/LineInterpreter.component";

import styles from "./HistoryInterpreter.styles.scss";

export const HistoryInterpreter = ({
  historyRef,
  histories,
  className,
  commandKeywords,
  onClick,
  palette,
}) => {
  return (
    <div
      ref={historyRef}
      className={`${styles.history_wrapper} ${className}`}
      onClick={onClick}
    >
      {histories.map((history, historyIndex) => {
        return (
          <div key={historyIndex}>
            {history.map((line, lineIndex) => {
              const id = `${historyIndex}-${lineIndex}`;

              return (
                <LineInterpreter
                  palette={palette}
                  {...line}
                  key={id}
                  id={id}
                  commandKeywords={commandKeywords}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
