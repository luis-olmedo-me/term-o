import React, { useEffect, useState } from "react";
import { SNACKBAR_UPDATE } from "../constants/eventsKeys.constants";

export const useEasySnackbar = () => {
  const [, setUpdate] = useState({});

  useEffect(function updateWhenEventIsTriggered() {
    const update = () => setUpdate({});

    addEventListener(SNACKBAR_UPDATE, update);

    return removeEventListener(SNACKBAR_UPDATE, update);
  }, []);
};
