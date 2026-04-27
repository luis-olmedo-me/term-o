import { errorBase } from '@src/commands'

import EventListener from '@src/templates/EventListener'

import { getArgs, splitBy } from '@src/helpers/arguments.helpers'
import { getHighestTitleCountInBases } from '@src/helpers/command.helpers'
import { truncate } from '@src/helpers/utils.helpers'
import { CommandChain } from '@src/templates/CommandChain/CommandChain.template'

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
    const fragments = splitBy(scriptFormatted, '&&')
    const chain = new CommandChain({
      highestTitleCount: getHighestTitleCountInBases(this.bases),
      title: rawScript
    })

    for (let fragment of fragments) {
      const command = this._build(fragment)

      chain.add(command)
      if (command.finished) break
    }

    return chain
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
