import { commandNames } from '@src/constants/command.constants'
import { getArgs } from '@src/helpers/arguments.helpers'
import commandParser from '@src/libs/command-parser'

export const createSuggestion = (value, caret, aliases) => {
  const aliasNames = aliases.map(alias => alias.key)
  const commandValueNames = Object.values(commandNames)
  const names = [...aliasNames, ...commandValueNames]

  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  const lastFragmentStart = (start.split('&&').at(-1) ?? '').trimLeft()
  const lastFragmentEnd = end.split('&&').at(0) ?? ''

  if (!lastFragmentStart && !lastFragmentEnd) return ''
  const argsStart = getArgs(lastFragmentStart)
  const argsEnd = getArgs(lastFragmentEnd)
  const lastArgStart = argsStart.at(-1) ?? ''
  const firstArgEnd = argsEnd.at(0) ?? ''

  if (argsStart.length <= 1) {
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
  const firstArgStart = argsStart.at(0) ?? ''
  const isCommand = commandValueNames.some(name => name === firstArgStart)

  if (!isCommand) return ''
  const command = commandParser.bases.find(base => base.name === firstArgStart)

  const options = command.options.values.map(option => `--${option.name}`)
  const abbreviations = command.options.values.map(option => `-${option.abbreviation}`)
  const optionNames = [...abbreviations, ...options]

  const match = optionNames.find(option => {
    if (!option.startsWith(lastArgStart)) return false
    if (!firstArgEnd) return true
    const optionEnd = option.slice(lastArgStart.length)

    return optionEnd.endsWith(firstArgEnd)
  })

  if (!match) return ''
  return firstArgEnd
    ? match.slice(lastArgStart.length, firstArgEnd.length * -1)
    : match.slice(lastArgStart.length)
}
