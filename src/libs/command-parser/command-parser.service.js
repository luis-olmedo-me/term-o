import EventListener from '@src/libs/event-listener'
import { splitBy } from './command-parser.helpers'
import handlers from './handlers'
import { getArgs } from './sub-services/command/command.helpers'
import templates, { errorTemplate } from './templates'

templates.map(template => {
  const handler = handlers[template.name]

  if (handler) template.setHandler(handler)
})

class CommandParser extends EventListener {
  constructor(templates) {
    super()

    this.templates = templates
    this.aliases = []
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
    const cleanedName = name.replace('"', '\\"')

    if (!template) {
      const error = errorTemplate.create()

      error.mock({ title: `The command "${cleanedName}" is unrecognized.` })
      error.execute()

      return error
    }

    const command = template.create().prepare(scriptArgs)

    return command
  }

  getWithAliasesResolved(script) {
    const fragments = splitBy(script, '&&')

    const fragmentsWithAliases = fragments.map(fragment => {
      const [name, ...scriptArgs] = getArgs(fragment)
      const aliasFound = this.aliases.find(alias => alias.key === name)?.value || null

      return [aliasFound || name, ...scriptArgs].join(' ')
    })

    return fragmentsWithAliases.join(' && ')
  }

  getTemplateByName(name) {
    return this.templates.find(template => template.name === name)
  }
}

export const commandParser = new CommandParser(templates)
