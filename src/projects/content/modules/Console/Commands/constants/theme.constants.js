import { historyTypes } from "../../components/HistoryInterpreter/HistoryInterpreter.constants";

export const darkTheme = {
  [historyTypes.COMMAND]: {
    keywordColor: "#E46000",
    keywordFontWeight: "bold",
    color: "#111111",
    fontWeight: "normal",
  },
  [historyTypes.ELEMENT]: {
    color: "#EC00E2",
    tagNameFontWeight: "bold",
  },
  [historyTypes.PLAIN]: {
    color: "#111111",
  },
};

export const lightTheme = {
  ...darkTheme,
  [historyTypes.COMMAND]: {
    ...darkTheme[historyTypes.COMMAND],
    color: "#CCCCCC",
  },
  [historyTypes.PLAIN]: {
    ...darkTheme[historyTypes.PLAIN],
    color: "#CCCCCC",
  },
};
