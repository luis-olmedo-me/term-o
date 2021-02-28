import React from "react";

import { LineInterpreter } from "./sub-components/LineInterpreter/LineInterpreter.component";

export const HistoryInterpreter = ({ historyRef, histories, className }) => {
  console.log("histories", histories);
  return (
    <div ref={historyRef} className={className}>
      {histories.map((history, historyIndex) => {
        return (
          <div key={historyIndex}>
            {history.map((line, lineIndex) => (
              <LineInterpreter {...line} key={`${historyIndex}-${lineIndex}`} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
