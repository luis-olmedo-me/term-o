import React from "react";

import { LineInterpreter } from "./sub-components/LineInterpreter/LineInterpreter.component";

export const HistoryInterpreter = ({ historyRef, histories, className }) => {
  console.log("histories", histories);
  return (
    <div ref={historyRef} className={className}>
      {histories.map((history, historyIndex) => {
        return (
          <div key={historyIndex}>
            {history.map((line, lineIndex) => {
              const id = `${historyIndex}-${lineIndex}`;

              return <LineInterpreter {...line} key={id} id={id} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
