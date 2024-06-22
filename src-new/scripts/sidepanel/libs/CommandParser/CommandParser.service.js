import { clear } from './commands/clear/clear.command'

class CommandParser {
  constructor(commands) {
    this.commands = commands
  }
}

export const commandParser = new CommandParser({
  clear
})
