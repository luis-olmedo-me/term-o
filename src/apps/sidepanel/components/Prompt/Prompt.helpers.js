import { commandNames } from '@src/constants/command.constants'
import { getArgs } from '@src/helpers/arguments.helpers'

export const createSuggestion = (value, caret, aliases) => {
  const aliasNames = aliases.map(alias => alias.key)
  const names = [...Object.values(commandNames), ...aliasNames]

  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  const lastFragmentStart = (start.split('&&').at(-1) ?? '').trimLeft()
  const lastFragmentEnd = end.split('&&').at(0) ?? ''
  const argsStart = getArgs(lastFragmentStart)
  const argsEnd = getArgs(lastFragmentEnd)

  if (argsStart.length === 0) return ''
  if (argsStart.length === 1) {
    const lastArgStart = argsStart.at(-1) ?? ''
    const firstArgEnd = argsEnd.at(0) ?? ''

    const match = names.find(name => {
      if (!name.startsWith(lastArgStart)) return false
      if (!firstArgEnd) return true
      const nameEnd = name.slice(lastArgStart.length)

      return nameEnd.endsWith(firstArgEnd)
    })

    if (!match) return ''
    return firstArgEnd
      ? match.slice(lastArgStart.length, firstArgEnd.length * -1)
      : match.slice(lastArgStart.length)
  }

  return ''
}
