import { createClear } from './commands/clear/clear.command'
import { createUknown } from './commands/unknown/unknown.command'

class CommandParser {
  constructor(commands) {
    this.commands = commands
  }

  read(scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const createCommand = this.commands[name] || createUknown

    return createCommand(scriptRaw).execute()
  }
}

export const commandParser = new CommandParser({
  clear: createClear
})
