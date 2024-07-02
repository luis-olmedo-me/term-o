import { getColor as C } from '@src/theme/theme.helpers'
import { splitBy } from './command-parser.helpers'
import { createCLEAR } from './commands/clear/clear.command'
import { createDOM } from './commands/dom/dom.command'
import { createERROR } from './commands/error/error.command'
import { createSTORAGE } from './commands/storage/storage.command'
import { createTABS } from './commands/tabs/tabs.command'
import EventListener from './sub-services/event-listener'

class CommandParser extends EventListener {
  constructor(commands) {
    super()

    this.commands = commands
    this.handlers = {}
  }

  read(rawScript) {
    let [firstFragment, ...nextFragments] = splitBy(rawScript, '&&')
    const command = this.get(rawScript, firstFragment)
    let carriedCommand = command

    nextFragments.forEach(fragment => {
      const nextCommand = this.get(rawScript, fragment)
      carriedCommand.queuedCommand = nextCommand
      carriedCommand = nextCommand

      return this.get(rawScript, fragment)
    })

    return command
  }

  get(fullScriptRaw, scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const createCommand = this.commands[name]
    const handler = this.handlers[name]
    const cleanedName = name.replace('"', '\\"')

    if (!createCommand)
      return createERROR(fullScriptRaw).mock({
        title: `'The command "${C`bright-red`}${cleanedName}${C`red`}" is unrecognized.'`
      })

    const command = createCommand(fullScriptRaw).prepare(scriptArgs)
    this.dispatchEvent(`on-create-${name}`, command)

    if (handler) command.addEventListener('execute', handler)

    return command
  }

  setHandlers(commandHandlers) {
    this.handlers = commandHandlers
  }
}

export const commandParser = new CommandParser({
  clear: createCLEAR,
  dom: createDOM,
  storage: createSTORAGE,
  tabs: createTABS,
  error: createERROR
})
