import { clear } from './commands/clear/clear.command'
import { unknown } from './commands/unknown/unknown.command'

class CommandParser {
  constructor(commands) {
    this.commands = commands
  }

  read(scriptRaw) {
    const [scriptName, ...scriptArgs] = scriptRaw.trim().split(' ')
    const script = this.commands[scriptName] || unknown

    return script
  }
}

export const commandParser = new CommandParser({
  clear
})
