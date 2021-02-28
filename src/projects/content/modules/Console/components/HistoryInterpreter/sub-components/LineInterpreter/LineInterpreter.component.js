import React from "react";
import { historyTypes } from "../../HistoryInterpreter.constants";
import { CommandLabel } from "../CommandLabel/CommandLabel.component";
import { ElementLabel } from "../ElementLabel/ElementLabel.component";

export const LineInterpreter = ({ id, label, type, value }) => {
  if (type === historyTypes.ELEMENT) return <ElementLabel value={value} />;
  if (type === historyTypes.COMMAND)
    return <CommandLabel label={label} id={id} />;
  else return <span>{label} </span>;
};
