import React, { useEffect, useState } from "react";
import { SNACKBAR_UPDATE } from "../constants/eventsKeys.constants";

export const useEasySnackbar = () => {
  const [values, setValues] = useState({});

  useEffect(function updateWhenEventIsTriggered() {
    const updateValues = ({ details: { theme, title, message } }) => {
      setValues({ theme, title, message });
    };

    addEventListener(SNACKBAR_UPDATE, updateValues);

    return removeEventListener(SNACKBAR_UPDATE, updateValues);
  }, []);

  return values;
};
