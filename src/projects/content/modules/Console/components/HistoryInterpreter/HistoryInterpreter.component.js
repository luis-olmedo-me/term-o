import React from "react";

import styles from "./HistoryInterpreter.styles.scss";

export const HistoryInterpreter = ({ histories }) => {
  console.log("histories", histories);
  return (
    <div className={styles.interpreter_wrapper}>
      {histories.map((text, index) => {
        return <p key={index}>{text.map(({ label }) => label).join(" ")}</p>;
      })}
    </div>
  );
};
