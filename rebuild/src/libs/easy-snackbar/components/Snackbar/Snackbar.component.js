import React, { useEffect, useState } from "react";
import { useEasySnackbar } from "../../hooks/useEasySnackbar.hook";

import styles from "./Snackbar.styles.scss";

export const Snackbar = () => {
  const [messages, setMessages] = useState([]);
  const snackbarMessage = useEasySnackbar();

  useEffect(
    function addMessageToList() {
      setMessages((oldSnackbarMessages) =>
        snackbarMessage.length
          ? [...oldSnackbarMessages, snackbarMessage]
          : oldSnackbarMessages
      );
    },
    [snackbarMessage]
  );

  console.log("messages", messages);

  return messages.map((messageFromHook, index) => {
    const [theme, title, message] = messageFromHook;
    const styleTheme = styles[theme] || styles.default;

    const removeMessageFromList = () => {
      setMessages(
        messages.filter((messageCycled) => messageCycled !== messageFromHook)
      );
    };

    const key = title.replace(" ", "_").toLowerCase();

    return (
      <div
        key={`${key}_${index}`}
        className={`${styles.snackbar__wrapper} ${styleTheme}`}
        onClick={removeMessageFromList}
      >
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
      </div>
    );
  });
};
