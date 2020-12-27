import { useEffect, useState } from "react";
import { broker } from "../../easy-broker/easyBroker.service";
import { SNACKBAR_UPDATE } from "../constants/eventsKeys.constants";

export const useEasySnackbar = () => {
  const [values, setValues] = useState([]);

  useEffect(function setUpBrokerEvent() {
    const updateValues = ({ theme, title, message }) => {
      setValues([theme, title, message]);
    };

    broker.on(SNACKBAR_UPDATE, ({ data }) => updateValues(data || {}));
  }, []);

  return values;
};
