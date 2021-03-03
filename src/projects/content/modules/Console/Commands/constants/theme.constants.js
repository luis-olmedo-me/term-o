import { historyTypes } from "../../components/HistoryInterpreter/HistoryInterpreter.constants";

export const darkTheme = {
  [historyTypes.COMMAND]: {
    keyword: { color: "#E46000", fontWeight: "bold" },
    normal: { color: "#111111", fontWeight: "normal" },
  },
  [historyTypes.ELEMENT]: {
    tag: { color: "#EC00E2", fontWeight: "bold" },
    class: { color: "#EC00E2" },
    id: { color: "#EC00E2" },
  },
  [historyTypes.PLAIN]: {
    plain: { color: "#111111" },
  },
};

export const lightTheme = {
  ...darkTheme,
  [historyTypes.COMMAND]: {
    ...darkTheme[historyTypes.COMMAND],
    normal: { color: "#CCCCCC" },
  },
  [historyTypes.PLAIN]: {
    ...darkTheme[historyTypes.PLAIN],
    plain: { color: "#CCCCCC" },
  },
};
