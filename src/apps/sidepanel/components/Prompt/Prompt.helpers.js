import { commandNames } from '@src/constants/command.constants'
import { getArgs } from '@src/helpers/arguments.helpers'
import commandParser from '@src/libs/command-parser'

const getArgsFromFragmentStart = fragment => {
  return fragment.endsWith(' ') ? [...getArgs(fragment), ''] : getArgs(fragment)
}
const getArgsFromFragmentEnd = fragment => {
  return fragment.startsWith(' ') ? ['', ...getArgs(fragment)] : getArgs(fragment)
}

const getSuggestionByName = (names, start, end) => {
  const match = names.find(name => {
    if (!name.startsWith(start)) return false
    if (!end) return true
    const nameEnd = name.slice(start.length)

    return nameEnd.endsWith(end)
  })

  if (!match) return ''
  return end ? match.slice(start.length, end.length * -1) : match.slice(start.length)
}

export const createSuggestion = (value, caret, aliases) => {
  const aliasNames = aliases.map(alias => alias.key)
  const commandValueNames = Object.values(commandNames)
  const names = [...aliasNames, ...commandValueNames]

  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  const lastFragmentStart = (start.split('&&').at(-1) ?? '').trimLeft()
  const lastFragmentEnd = end.split('&&').at(0) ?? ''

  if (!lastFragmentStart && !lastFragmentEnd) return ''
  const argsStart = getArgsFromFragmentStart(lastFragmentStart)
  const argsEnd = getArgsFromFragmentEnd(lastFragmentEnd)

  const lastArgStart = argsStart.at(-1) ?? ''
  const firstArgEnd = argsEnd.at(0) ?? ''

  if (argsStart.length <= 1) return getSuggestionByName(names, lastArgStart, firstArgEnd)
  const restArgsStart = argsStart.slice(1, -1)
  const restArgsEnd = argsEnd.slice(1)
  const firstArgStart = argsStart.at(0) ?? ''
  const isCommand = commandValueNames.some(name => name === firstArgStart)

  if (!isCommand) return ''
  const command = commandParser.bases.find(base => base.name === firstArgStart)

  const optionNames = command.options.values.reduce((names, option) => {
    const optionName = `--${option.name}`
    const abbreviation = `-${option.abbreviation}`

    const isOptionDuplicated =
      restArgsStart.includes(optionName) || restArgsEnd.includes(optionName)
    const isAbbrDuplicated =
      restArgsStart.includes(abbreviation) || restArgsEnd.includes(abbreviation)

    return isOptionDuplicated || isAbbrDuplicated ? names : names.concat(abbreviation, optionName)
  }, [])

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
