import { commandTypes } from '@src/constants/command.constants'
import { getArray } from './arguments.helpers'

export const getOptionTypeLabel = type => {
  if (type === commandTypes.STRING_ARRAY) return '<string[]>'
  if (type === commandTypes.STRING) return '<string>'
  if (type === commandTypes.NUMBER) return '<number>'
  if (type === commandTypes.BOOLEAN) return '<boolean>'
  return ''
}

export const isParam = (option, arg) => {
  const isBoolean = option.type === 'boolean'

  const paramPattern = /^\$\d+(,\d+)?(-\d+)?$/
  const argValue = arg?.value

  return !isBoolean && Boolean(argValue) && paramPattern.test(argValue)
}

export const getParamValue = (indexes, values) => {
  if (indexes.length === 1) {
    const [index] = indexes

    return values[index] || ''
  }

  const parsedValues = indexes.map(index => values[index]).filter(Boolean)
  const valuesInLine = parsedValues.join(' ')

  if (!parsedValues.length) return ''

  return `[ ${valuesInLine} ]`
}

export const parseOptions = (index, arg, argsBySpace, type) => {
  const typeLabel = getOptionTypeLabel(type)

  switch (type) {
    case commandTypes.STRING: {
      index++
      const argValue = argsBySpace.at(index) || ''
      const quote = argValue.charAt(0)

      const startsWithQuote = /"|'/g.test(quote)
      const endsWithQUote = argValue.endsWith(quote)

      if ((!startsWithQuote || !endsWithQUote) && !argValue)
        throw `${arg} expects for quoted ${typeLabel} value. Instead, it received nothing.`

      if (!startsWithQuote || !endsWithQUote)
        throw `${arg} expects for quoted ${typeLabel} value. Instead, it received ${argValue}.`

      const quotesPattern = new RegExp(`^${quote}|${quote}$`, 'g')
      const value = argValue.replace(quotesPattern, '')

      if (!value)
        throw `${arg} expects for content inside of quoted ${typeLabel} value. Instead, it received ${argValue}.`

      return { value, newIndex: index }
    }

    case commandTypes.BOOLEAN: {
      return { value: true, newIndex: index }
    }

    case commandTypes.NUMBER: {
      const nextArg = argsBySpace.at(++index)
      const value = Number(nextArg)
      const isValidNumber = !Number.isNaN(value)

      if (!isValidNumber)
        throw `"${arg}" expects ${typeLabel} value. Instead, it received ${nextArg}.`

      return { value, newIndex: index }
    }

    case commandTypes.STRING_ARRAY: {
      index++
      const argValue = argsBySpace.at(index) || ''

      const startsWithBracket = argValue.startsWith('[')
      const endsWithBracket = argValue.endsWith(']')

      if ((!startsWithBracket || !endsWithBracket) && !argValue)
        throw `${arg} expects for ${typeLabel} value. Instead, it received nothing.`

      if (!startsWithBracket || !endsWithBracket)
        throw `${arg} expects for ${typeLabel} value. Instead, it received ${argValue}.`

      const arrayValue = getArray(argValue)
      const isValidValue = arrayValue.every(value => {
        const isString = typeof value === 'string'
        const hasContent = Boolean(value)

        return isString && hasContent
      })
      const hasItems = arrayValue.length > 0

      if (!isValidValue || !hasItems)
        throw `${arg} expects for valid content in ${typeLabel} value(s). Instead, it received ${argValue}.`

      return { value: arrayValue, newIndex: index }
    }

    default:
      throw `Option type ${type} is not recognized.`
  }
}

export const getPropsFromString = command => {
  const args = command.args
  const argValues = args.map(arg => arg.value)
  let props = {}

  for (let index = 0; index < args.length; index++) {
    const arg = args[index]
    const argValue = arg.value

    if (argValue.startsWith('--')) {
      const propName = argValue.slice(2)
      const option = command.options.getByName(propName)
      const nextArg = args[index + 1]

      if (typeof props[option.name] !== 'undefined') throw `${argValue} is a repeated argument.`

      if (isParam(option, nextArg)) {
        index++
        nextArg.holdUp()

        continue
      }

      const argName = option.displayName
      const { value, newIndex } = parseOptions(index, argName, argValues, option.type)
      option.validate(value)
      index = newIndex

      props = { ...props, [option.name]: value }
      continue
    }
    if (argValue.startsWith('-')) {
      const propAbbreviation = argValue.slice(1)
      const option = command.options.getByAbbreviation(propAbbreviation)
      const nextArg = args[index + 1]

      if (typeof props[option.name] !== 'undefined') throw `${argValue} is a repeated argument.`

      if (isParam(option, nextArg)) {
        index++
        nextArg.holdUp()

        continue
      }

      const argName = option.displayName
      const { value, newIndex } = parseOptions(index, argName, argValues, option.type)
      option.validate(value)
      index = newIndex

      props = { ...props, [option.name]: value }
      continue
    }

    throw `${argValue} is an unexpected argument.`
  }

  return props
}
