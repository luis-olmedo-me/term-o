import { commandNames } from '@src/constants/command.constants'
import { getArgs } from '@src/helpers/arguments.helpers'

export const createSuggestion = (value, caret) => {
  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  const lastFragmentStart = start.split('&&').at(-1) ?? ''
  const lastFragmentEnd = end.split('&&').at(0) ?? ''
  const argsStart = getArgs(lastFragmentStart)
  const argsEnd = getArgs(lastFragmentEnd)

  if (argsStart.length === 0) return ''
  if (argsStart.length === 1) {
    const firstArgEnd = argsEnd.at(0) ?? ''
    const match = Object.values(commandNames).find(name => {
      if (!name.startsWith(start)) return false
      if (!firstArgEnd) return true

      const nameEnd = name.slice(start.length)

      return nameEnd.endsWith(firstArgEnd)
    })

    if (!match) return ''
    return firstArgEnd
      ? match.slice(start.length, firstArgEnd.length * -1)
      : match.slice(start.length)
  }

  return ''
}
