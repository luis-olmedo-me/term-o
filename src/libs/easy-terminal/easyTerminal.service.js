import { historyTypes } from "projects/content/modules/Console/components/HistoryInterpreter/HistoryInterpreter.constants";

class Terminal {
  constructor() {
    this.validCommands = {};
  }

  setValidCommands(validCommands) {
    this.validCommands = validCommands;
  }

  execute(line = "") {
    const commandLines = line
      .trim()
      .split("|")
      .map((line) => line.trim());

    const finalValue = commandLines.reduce((carriedArguments, commandLine) => {
      const [command, ...commandArguments] = commandLine.split(" ");
      const validCommand = this.validCommands[command];
      const carried = carriedArguments.length ? [carriedArguments] : [];

      return validCommand?.callback([...carried, ...commandArguments]);
    }, []);

    return [
      [{ label: line, value: line, type: historyTypes.COMMAND }],
      finalValue ? finalValue : [{ label: "Error: command not exist" }],
    ];
  }
}

export const terminal = new Terminal();
