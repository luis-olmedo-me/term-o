import { commandNames } from '@src/constants/command.constants'
import { getArgs } from '@src/helpers/arguments.helpers'

export const createSuggestion = (value, caret) => {
  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  const lastFragmentStart = start.split('&&').at(-1) ?? ''
  const lastFragmentEnd = end.split('&&').at(0) ?? ''
  const argsStart = getArgs(lastFragmentStart)
  const argsEnd = getArgs(lastFragmentEnd)

  console.log('💬 ~ argsStart:', argsStart)
  console.log('💬 ~ argsEnd:', argsEnd)

  if (argsStart.length === 0) return ''
  if (argsStart.length === 1) {
    const matches = Object.values(commandNames).filter(name => name.startsWith(start))

    if (matches.length === 0) return ''
    return matches.at(0).slice(start.length)
  }

  return ''
}
