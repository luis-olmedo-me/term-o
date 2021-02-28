import React from "react";

import styles from "./TextInterpreter.styles.scss";

export const TextInterpreter = ({ texts }) => {
  console.log("texts", texts);
  return (
    <div className={styles.interpreter_wrapper}>
      {texts.map((text, index) => {
        return <p key={index}>{text.map(({ label }) => label).join(" ")}</p>;
      })}
    </div>
  );
};
