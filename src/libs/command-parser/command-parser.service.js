import EventListener from '@src/libs/event-listener'
import { splitBy } from './command-parser.helpers'
import commandTemplates from './commands'
import errorTemplate from './commands/error/error.command'
import { getArgs } from './sub-services/command/command.helpers'

class CommandParser extends EventListener {
  constructor(templates, formatter) {
    super()

    this.templates = templates
    this.handlers = {}
    this.aliases = []
    this.formatter = formatter || null
  }

  setAliases(aliases) {
    this.aliases = aliases
  }

  read(rawScript) {
    const scriptFormatted = this.getWithAliasesResolved(rawScript)
    let [firstFragment, ...nextFragments] = splitBy(scriptFormatted, '&&')

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
    const [name, ...scriptArgs] = getArgs(scriptRaw)

    const template = this.templates.find(template => template.name === name)
    const handler = this.handlers[name]
    const cleanedName = name.replace('"', '\\"')

    if (!template) {
      const error = errorTemplate.create()
      const handler = this.handlers.error

      error.mock({ title: `'The command "${cleanedName}" is unrecognized.'` })
      if (handler) error.addEventListener('execute', handler)
      error.execute()

      return error
    }

    const command = template.create().prepare(scriptArgs)

    if (handler) command.addEventListener('execute', handler)

    return command
  }

  setHandlers(commandHandlers) {
    this.handlers = commandHandlers
  }

  getWithAliasesResolved(script) {
    const [name, ...scriptArgs] = getArgs(script)
    const aliasFound = this.aliases.find(alias => alias.key === name)?.value || null

    return aliasFound ? [aliasFound, ...scriptArgs].join(' ') : script
  }
}

export const commandParser = new CommandParser(commandTemplates)
