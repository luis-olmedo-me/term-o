import { getColor as C } from '@src/theme/theme.helpers'
import { splitBy } from './command-parser.helpers'
import { createALIAS } from './commands/alias/alias.command'
import { createCLEAR } from './commands/clear/clear.command'
import { createDOM } from './commands/dom/dom.command'
import { createERROR } from './commands/error/error.command'
import { createSTORAGE } from './commands/storage/storage.command'
import { createTABS } from './commands/tabs/tabs.command'
import { getArgs } from './sub-services/command/command.helpers'
import EventListener from './sub-services/event-listener'

class CommandParser extends EventListener {
  constructor(commands) {
    super()

    this.commands = commands
    this.handlers = {}
    this.aliases = []
  }

  setAliases(aliases) {
    this.aliases = aliases
  }

  read(rawScript) {
    let [firstFragment, ...nextFragments] = splitBy(rawScript, '&&')
    const command = this.get(firstFragment)
    let carriedCommand = command

    for (let fragment of nextFragments) {
      const nextCommand = this.get(fragment)
      carriedCommand.nextCommand = nextCommand

      if (nextCommand.finished) break

      carriedCommand = nextCommand
    }

    return command.setTitle(rawScript)
  }

  get(scriptRaw) {
    const [name, ...scriptArgs] = this.getWithAliasesResolved(scriptRaw)

    const createCommand = this.commands[name]
    const handler = this.handlers[name]
    const cleanedName = name.replace('"', '\\"')

    if (!createCommand) {
      return createERROR().mock({
        title: `'The command "${C`bright-red`}${cleanedName}${C`red`}" is unrecognized.'`
      })
    }

    const command = createCommand().prepare(scriptArgs)
    this.dispatchEvent(`on-create-${name}`, command)

    if (handler) command.addEventListener('execute', handler)

    return command
  }

  setHandlers(commandHandlers) {
    this.handlers = commandHandlers
  }

  getWithAliasesResolved(script) {
    const [name, ...scriptArgs] = getArgs(script)
    const aliasFound = this.aliases.find(alias => alias.key === name)?.value || null

    if (!aliasFound) return [name, ...scriptArgs]

    const newScript = [aliasFound, ...scriptArgs].join(' ')

    return getArgs(newScript)
  }
}

export const commandParser = new CommandParser({
  clear: createCLEAR,
  dom: createDOM,
  storage: createSTORAGE,
  tabs: createTABS,
  alias: createALIAS,
  error: createERROR
})
