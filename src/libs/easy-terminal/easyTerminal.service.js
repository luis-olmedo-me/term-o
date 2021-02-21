class Terminal {
  constructor() {
    this.validCommands = {};
  }

  setValidCommands(validCommands) {
    this.validCommands = validCommands;
  }

  execute(commandLine = "") {
    const [command, ...commandArguments] = commandLine.split(" ");
    const validCommand = this.validCommands[command];

    return validCommand
      ? [commandLine, validCommand.callback(commandArguments), ""]
      : [commandLine, "Error: command not exist", ""];
  }
}

export const terminal = new Terminal();
