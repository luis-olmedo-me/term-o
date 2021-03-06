import React from "react";
import { historyTypes } from "../../HistoryInterpreter.constants";
import { CommandLabel } from "../CommandLabel/CommandLabel.component";
import { ElementLabel } from "../ElementLabel/ElementLabel.component";

const space = " ";

export const LineInterpreter = ({
  id,
  label,
  type,
  value,
  commandKeywords,
  palette: themeObject,
}) => {
  const theme = themeObject[type] || themeObject[historyTypes.PLAIN];
  const commonProps = {
    value,
    id,
    theme,
  };

  switch (type) {
    case historyTypes.ELEMENT:
      return (
        <>
          <ElementLabel {...commonProps} />
          {space}
        </>
      );

    case historyTypes.COMMAND:
      return (
        <>
          <CommandLabel {...commonProps} keywords={commandKeywords} />
          {space}
        </>
      );

    default:
      return (
        <>
          <span style={theme.plain}>{label}</span>
          {space}
        </>
      );
  }
};
