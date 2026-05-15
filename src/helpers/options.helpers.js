import processManager from '@src/libs/process-manager'

import { commandTypes } from '@src/constants/command.constants'
import { tabEventCategory, tabEventDefinitions } from '@src/constants/options.constants'
import { getArray } from '@src/helpers/arguments.helpers'
import { getTargetXpath } from '@src/helpers/dom-locator.helpers'
import { isStrictQuoted, quotify, truncate } from '@src/helpers/string.helpers'
import { countMatches } from '@src/helpers/utils.helpers'

export const getOptionTypeLabel = type => {
  if (type === commandTypes.ARRAY) return '<array>'
  if (type === commandTypes.STRING) return '<string>'
  if (type === commandTypes.NUMBER) return '<number>'
  if (type === commandTypes.BOOLEAN) return '<boolean>'
  return ''
}

export const isParam = (option, arg) => {
  const isBoolean = option.type === 'boolean'

  const paramPattern = /^\$\d+(,\d+)?(-\d+)?$/
  const argValue = arg?.value
  const isParamValue = paramPattern.test(argValue) || argValue === '$.' || argValue === '$-'

  return !isBoolean && Boolean(argValue) && isParamValue
}

export const parseOptions = (index, arg, argsBySpace, type) => {
  const typeLabel = getOptionTypeLabel(type)

  switch (type) {
    case commandTypes.STRING: {
      index++
      const argValue = argsBySpace.at(index) || ''
      const truncatedArgValue = truncate(argValue, 30)
      const quote = argValue.charAt(0)
      const hasQuotes = isStrictQuoted(argValue)

      if (!hasQuotes && !argValue)
        throw `${arg} expects for quoted ${typeLabel} value. Instead, it received nothing.`

      if (!hasQuotes)
        throw `${arg} expects for quoted ${typeLabel} value. Instead, it received ${quotify(truncatedArgValue)}.`

      const quotesPattern = new RegExp(`^${quote}|${quote}$`, 'g')
      const value = argValue.replace(quotesPattern, '')

      const quotePattern = new RegExp(`(?<!\\\\)${quote}`, 'g')
      const quotesCount = countMatches(argValue, quotePattern)

      if (quotesCount !== 2)
        throw `${arg} expects for a properly quoted ${typeLabel} value. Instead, it received ${quotify(truncatedArgValue)}.`

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

    case commandTypes.ARRAY: {
      index++
      const argValue = argsBySpace.at(index) || ''

      const startsWithBracket = argValue.startsWith('[')
      const endsWithBracket = argValue.endsWith(']')

      if ((!startsWithBracket || !endsWithBracket) && !argValue)
        throw `${arg} expects for ${typeLabel} value. Instead, it received nothing.`

      if (!startsWithBracket || !endsWithBracket)
        throw `${arg} expects for ${typeLabel} value. Instead, it received ${argValue}.`

      const arrayValue = getArray(argValue)

      if (arrayValue === null)
        throw `${arg} expects for ${typeLabel} value. Instead, it received ${argValue}.`

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
      const alreadySetValue = props[option.name]

      const overwritesOptionValue = typeof alreadySetValue !== 'undefined'
      const isRepeatable = option.repeatable

      if (overwritesOptionValue && !isRepeatable) throw `${argValue} is a repeated argument.`

      if (isParam(option, nextArg)) {
        index++
        nextArg.holdUp()

        continue
      }

      const argName = option.displayName
      const { value, newIndex } = parseOptions(index, argName, argValues, option.type)
      const completeValue = isRepeatable ? [...(alreadySetValue || []), value] : value
      index = newIndex

      props = { ...props, [option.name]: completeValue }
      continue
    }
    if (argValue.startsWith('-')) {
      const propAbbreviation = argValue.slice(1)
      const option = command.options.getByAbbreviation(propAbbreviation)
      const nextArg = args[index + 1]
      const alreadySetValue = props[option.name]

      const overwritesOptionValue = typeof alreadySetValue !== 'undefined'
      const isRepeatable = option.repeatable

      if (overwritesOptionValue && !isRepeatable) throw `${argValue} is a repeated argument.`

      if (isParam(option, nextArg)) {
        index++
        nextArg.holdUp()

        continue
      }

      const argName = option.displayName
      const { value, newIndex } = parseOptions(index, argName, argValues, option.type)
      const completeValue = isRepeatable ? [...(alreadySetValue || []), value] : value
      index = newIndex

      props = { ...props, [option.name]: completeValue }
      continue
    }

    throw `${argValue} is an unexpected argument.`
  }

  return props
}

export const getEventDefinition = event => {
  return tabEventDefinitions.find(definition => definition.pattern.test(event.type))
}

const registerEvent = (below, definition, event) => {
  const rawEventName = event.type
  const eventName = definition.getName(rawEventName)

  below.addEventListener(eventName, event => {
    const xpath = getTargetXpath(event.target)
    const params = xpath ? [quotify(xpath)] : []

    processManager.dispathTabEvent({ type: rawEventName, params })
  })
}

export const registerTabEvents = async () => {
  const events = await processManager.getEvents()

  for (const event of events) {
    const definition = getEventDefinition(event)

    if (!definition) continue

    switch (definition.category) {
      case tabEventCategory.DOCUMENT:
        return registerEvent(window.document, definition, event)

      case tabEventCategory.WINDOW:
        return registerEvent(window, definition, event)
    }
  }
}
