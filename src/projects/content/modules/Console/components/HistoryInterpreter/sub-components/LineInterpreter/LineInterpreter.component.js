import React from "react";
import { historyTypes } from "../../HistoryInterpreter.constants";
import { CommandLabel } from "../CommandLabel/CommandLabel.component";
import { ElementLabel } from "../ElementLabel/ElementLabel.component";

export const LineInterpreter = ({
  id,
  label,
  type,
  value,
  commandKeywords,
  palette: themeObject,
}) => {
  const theme = themeObject[type];
  const commonProps = {
    value,
    id,
    theme,
  };

  switch (type) {
    case historyTypes.ELEMENT:
      return <ElementLabel {...commonProps} />;

    case historyTypes.COMMAND:
      return <CommandLabel {...commonProps} keywords={commandKeywords} />;

    default:
      return <span style={{ color: theme.color }}>{label} </span>;
  }
};
