import React from "react";
import { EASY_DOM_CONTENT_ID } from "../../content.constants";

import styles from "./Content.styles.scss";

export const Content = () => {
  return (
    <div id={EASY_DOM_CONTENT_ID} className={`${styles.content_wrapper}`}></div>
  );
};
