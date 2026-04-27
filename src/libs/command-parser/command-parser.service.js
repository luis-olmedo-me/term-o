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
  }

  setExternalBases(externalBases) {
    if (externalBases.length) this.bases = this.defaultBases.concat(externalBases)
  }

  setAliases(aliases) {
    this.aliases = aliases
  }

  read(rawScript) {
    const scriptFormatted = this._solveAliases(rawScript)
    let [firstFragment, ...nextFragments] = splitBy(scriptFormatted, '&&')

    const command = this._build(firstFragment)
    let carriedCommand = command

    for (let fragment of nextFragments) {
      const nextCommand = this._build(fragment)
      carriedCommand.nextCommand = nextCommand

      if (nextCommand.finished) break

      carriedCommand = nextCommand
    }

    return command.share({
      highestTitleCount: getHighestTitleCountInBases(this.bases),
      title: rawScript
    })
  }

  _build(fragment) {
    const [name, ...scriptArgs] = getArgs(fragment)

    const base = this.bases.find(base => base.name === name)
    const cleanedName = name.replace('"', '\\"')

    if (!base) {
      const error = errorBase.create()
      const truncatedName = truncate(cleanedName, 30)

      error.mock({ create: true, title: `The command "${truncatedName}" is unrecognized.` })
      error.execute()

      return error
    }

    return base.create().prepare(scriptArgs)
  }

  _solveAliases(script) {
    const fragments = splitBy(script, '&&')

    const fragmentsWithAliases = fragments.map(fragment => {
      const [name, ...scriptArgs] = getArgs(fragment)
      const aliasFound = this.aliases.find(alias => alias.key === name)?.value || null

      return [aliasFound || name, ...scriptArgs].join(' ')
    })

    return fragmentsWithAliases.join(' && ')
  }
}
