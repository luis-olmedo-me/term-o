import EventListener from '@src/libs/event-listener'

import { getArgs } from '@src/templates/Command/Command.helpers'

import { splitBy } from './command-parser.helpers'
import handlers from './handlers'
import templates, { errorTemplate } from './templates'

templates.forEach(template => {
  const handler = handlers[template.name]

  if (handler) template.setHandler(handler)
})

class CommandParser extends EventListener {
  constructor(templates) {
    super()

    this.templates = templates
    this.aliases = []
    this.executionContext = null
  }

  setAliases(aliases) {
    this.aliases = aliases
  }
  setExecutionContext(executionContext) {
    this.executionContext = executionContext
  }

  read(rawScript) {
    const scriptFormatted = this.getWithAliasesResolved(rawScript)
    let [firstFragment, ...nextFragments] = splitBy(scriptFormatted, '&&')

    const command = this.parse(firstFragment).setTitle(rawScript)
    let carriedCommand = command

    for (let fragment of nextFragments) {
      const nextCommand = this.parse(fragment).setTitle(rawScript)
      carriedCommand.nextCommand = nextCommand

      if (nextCommand.finished) break

      carriedCommand = nextCommand
    }

    return command
  }

  parse(fragment) {
    const [name, ...scriptArgs] = getArgs(fragment)

    const template = this.templates.find(template => template.name === name)
    const cleanedName = name.replace('"', '\\"')

    if (!template) {
      const error = errorTemplate.create(this.executionContext)

      error.mock({ title: `The command "${cleanedName}" is unrecognized.` })
      error.execute()

      return error
    }

    const command = template.create(this.executionContext).prepare(scriptArgs)

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
