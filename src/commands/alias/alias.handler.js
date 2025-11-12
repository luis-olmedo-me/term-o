import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatAlias } from '@src/helpers/format.helpers'

export const aliasHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const aliases = storage.get(storageKeys.ALIASES)
    const updates = aliases.map(formatAlias)

    command.update(...updates)
  }

  if (P`add`.length) {
    const [key, value] = P`add`
    const newAlias = { key, value }

    const aliases = storage.get(storageKeys.ALIASES)
    const alreadyExists = aliases.some(alias => alias.key === key)

    if (alreadyExists) throw `The alias "${key}" already exists.`

    const newAliases = aliases.concat(newAlias)
    const update = formatAlias(newAlias)

    storage.set(storageKeys.ALIASES, newAliases)
    command.update(update)
  }

  if (P`delete`) {
    const key = P`delete`

    const aliases = storage.get(storageKeys.ALIASES)
    const existingAlias = aliases.find(alias => alias.key === key)

    if (!existingAlias) throw `The alias "${key}" does not exist.`

    const newAliases = aliases.filter(alias => alias.key !== key)
    const update = formatAlias(existingAlias)

    storage.set(storageKeys.ALIASES, newAliases)
    command.update(update)
  }

  if (P`help`) createHelpView(command)
}
