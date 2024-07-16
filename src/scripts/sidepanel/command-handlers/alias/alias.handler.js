import { getColor as C } from '@src/theme/theme.helpers'
import { displayHelp } from '../command-handlers.helpers'

export const handleALIAS = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const { aliases = [] } = await chrome.storage.local.get('aliases')

    aliases.forEach(({ key, value }) => {
      command.update(`${C`purple`}"${key}" ${C`yellow`}"${value}"`)
    })
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

    await chrome.storage.local.set({ aliases: newAliases })

    command.update(`${C`purple`}"${key}" ${C`yellow`}"${value}"`)
  }

  if (P`delete`) {
    const key = P`delete`

    const { aliases = [] } = await chrome.storage.local.get('aliases')
    const existingAlias = aliases.find(alias => alias.key.includes(key))

    if (!existingAlias) {
      return command.throw(`The alias ${C`brightRed`}"${key}"${C`red`} does not exist.`)
    }

    const newAliases = aliases.filter(alias => alias.key !== key)

    await chrome.storage.local.set({ aliases: newAliases })

    command.update(`${C`purple`}"${key}" ${C`yellow`}"${existingAlias.value}"`)
  }

  if (P`help`) displayHelp(command)
}
