import React from "react";
import { historyTypes } from "../../HistoryInterpreter.constants";
import { ElementLabel } from "../ElementLabel/ElementLabel.component";

export const LineInterpreter = ({ label, type, value }) => {
  if (type === historyTypes.ELEMENT) return <ElementLabel value={value} />;
  else return <span>{label} </span>;
};
