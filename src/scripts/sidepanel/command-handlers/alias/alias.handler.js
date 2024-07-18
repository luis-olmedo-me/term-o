import { getColor as C } from '@src/theme/theme.helpers'
import { displayHelp, formatAlias } from '../command-handlers.helpers'

export const handleALIAS = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const { aliases = [] } = await chrome.storage.local.get('aliases')
    const updates = aliases.map(formatAlias)

    command.update(...updates)
  }

  if (P`add`.length) {
    const [key, value] = P`add`
    const newAlias = { key, value }

    const { aliases = [] } = await chrome.storage.local.get('aliases')
    const alreadyExists = aliases.some(alias => alias.key.includes(key))

    if (alreadyExists) {
      return command.throw(`The alias ${C`brightRed`}"${key}"${C`red`} already exists.`)
    }

    const newAliases = aliases.concat(newAlias)
    const update = formatAlias(newAlias)

    await chrome.storage.local.set({ aliases: newAliases })
    command.update(update)
  }

  if (P`delete`) {
    const key = P`delete`

    const { aliases = [] } = await chrome.storage.local.get('aliases')
    const existingAlias = aliases.find(alias => alias.key.includes(key))

    if (!existingAlias) {
      return command.throw(`The alias ${C`brightRed`}"${key}"${C`red`} does not exist.`)
    }

    const newAliases = aliases.filter(alias => alias.key !== key)
    const update = formatAlias(existingAlias)

    await chrome.storage.local.set({ aliases: newAliases })
    command.update(update)
  }

  if (P`help`) displayHelp(command)
}
