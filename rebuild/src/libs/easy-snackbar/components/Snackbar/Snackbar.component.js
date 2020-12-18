import React from "react";
import { useEasySnackbar } from "../../hooks/useEasySnackbar.hook";

export const Snackbar = () => {
  const [theme, title, message] = useEasySnackbar();
  console.log("update", [theme, title, message]);

  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
      <p>{theme}</p>
    </div>
  );
};
