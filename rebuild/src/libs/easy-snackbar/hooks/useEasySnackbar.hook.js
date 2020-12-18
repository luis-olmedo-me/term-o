import { useCallback, useState } from "react";
import { SNACKBAR_UPDATE } from "../constants/eventsKeys.constants";

export const useEasySnackbar = () => {
  const [values, setValues] = useState(["", "", ""]);

  const updateValues = useCallback(({ detail: { theme, title, message } }) => {
    setValues([theme, title, message]);

    window.removeEventListener(SNACKBAR_UPDATE, updateValues);
  }, []);

  window.addEventListener(SNACKBAR_UPDATE, updateValues);

  return values;
};
