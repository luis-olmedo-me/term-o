import { errorBase } from '@src/commands'

import EventListener from '@src/templates/EventListener'

import { getArgs, splitBy } from '@src/helpers/arguments.helpers'
import { getHighestTitleCountInBases } from '@src/helpers/command.helpers'
import { truncate } from '@src/helpers/utils.helpers'

export class CommandParser extends EventListener {
  constructor(bases) {
    super()

    this.defaultBases = bases
    this.bases = bases
    this.aliases = []
    this.origin = null
    this.highestTitleCount = getHighestTitleCountInBases(bases)
  }

  setExternalBases(externalBases) {
    if (externalBases.length) this.bases = this.defaultBases.concat(externalBases)
  }

  setAliases(aliases) {
    this.aliases = aliases
  }
  setOrigin(origin) {
    this.origin = origin
  }

  read(rawScript) {
    const data = { highestTitleCount: this.highestTitleCount }
    const scriptFormatted = this.getWithAliasesResolved(rawScript)
    let [firstFragment, ...nextFragments] = splitBy(scriptFormatted, '&&')

    const command = this.parse(firstFragment).setTitle(rawScript).applyData(data)
    let carriedCommand = command

    for (let fragment of nextFragments) {
      const nextCommand = this.parse(fragment).setTitle(rawScript).applyData(data)
      carriedCommand.nextCommand = nextCommand

      if (nextCommand.finished) break

      carriedCommand = nextCommand
    }

    return command
  }

  parse(fragment) {
    const [name, ...scriptArgs] = getArgs(fragment)

    const base = this.bases.find(base => base.name === name)
    const cleanedName = name.replace('"', '\\"')

    if (!base) {
      const error = errorBase.create(this.origin)
      const truncatedName = truncate(cleanedName, 30)

      error.mock({ title: `The command "${truncatedName}" is unrecognized.` })
      error.execute()

      return error
    }

    const command = base.create(this.origin).prepare(scriptArgs)

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
}
