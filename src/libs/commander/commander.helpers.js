import { kebabize } from './commander.promises'
import { optionTypes } from './constants/commands.constants'

export const parsePropsIntoSuggestions = propsConfigs => {
  if (!propsConfigs) return []

  return propsConfigs.reduce((result, propConfig) => {
    const groupProps = parsePropsIntoSuggestions(propConfig.groupProps)

    const newValue = groupProps.length
      ? groupProps
      : [
          {
            ...propConfig,
            alias: `-${propConfig.alias}`,
            value: `--${kebabize(propConfig.key)}`
          }
        ]

    return [...result, ...newValue]
  }, [])
}

const breakArrayInCertainIndexes = (array, indexes) => {
  if (!indexes.length) return [array]

  return indexes.reduce((arrayBroken, index, currentIndex) => {
    const isFirstElement = currentIndex === 0
    const isLastElement = currentIndex === indexes.length - 1

    const lastIndex = indexes[currentIndex - 1] || 0
    const previousIndex = isFirstElement ? lastIndex : lastIndex + 1

    const newResult = array.slice(previousIndex, index)

    return isLastElement
      ? [...arrayBroken, newResult, array.slice(index + 1)]
      : [...arrayBroken, newResult]
  }, [])
}

const isOdd = number => number % 2 !== 0
const hasDoubleQuoteType = (string, quote) => {
  const quoteTypeCount = string.match(new RegExp(quote, 'g'))?.length || -1

  return !isOdd(quoteTypeCount)
}

export const splitArgsTakingInCountSymbols = (args, symbols = ['|'], _quotes) => {
  let carriedArgsWithQuotes = []
  let indexesToBreak = []
  let shouldCarryArgs = false
  let breakIndexOffset = 0
  const quotesToUse = _quotes || '"'

  const argsByQuotes = args.reduce((parsedArguments, argument, index) => {
    const hasQuotes = argument.includes(quotesToUse)
    const hasAllQuotes = hasDoubleQuoteType(argument, quotesToUse) && !shouldCarryArgs
    const isVerticalLine = symbols.includes(argument)
    const isLastArgument = index === args.length - 1

    if (hasAllQuotes) {
      return [...parsedArguments, argument]
    } else if (hasQuotes) {
      carriedArgsWithQuotes = [...carriedArgsWithQuotes, argument]
      shouldCarryArgs = !shouldCarryArgs

      const newParsedArguments =
        isLastArgument || !shouldCarryArgs
          ? [...parsedArguments, carriedArgsWithQuotes.join(' ')]
          : parsedArguments

      if (!shouldCarryArgs) {
        carriedArgsWithQuotes = []
      } else {
        breakIndexOffset++
      }

      return newParsedArguments
    } else if (shouldCarryArgs) {
      carriedArgsWithQuotes = [...carriedArgsWithQuotes, argument]

      return isLastArgument
        ? [...parsedArguments, carriedArgsWithQuotes.join(' ')]
        : parsedArguments
    } else if (isVerticalLine) {
      indexesToBreak = [...indexesToBreak, index - breakIndexOffset]
    }

    return [...parsedArguments, argument]
  }, [])

  return _quotes
    ? breakArrayInCertainIndexes(argsByQuotes, indexesToBreak)
    : splitArgsTakingInCountSymbols(argsByQuotes, symbols, "'")
}

const getRowDataFromOption = option => {
  const rowDataReversedPattern = /(?<value>.+)=(?<key>.+)/g
  const reversedOption = option
    .split('')
    .reverse()
    .join('')

  const {
    groups: { key = '', value = '' }
  } = rowDataReversedPattern.exec(reversedOption) || { groups: {} }

  const restoredKey = key
    .split('')
    .reverse()
    .join('')
  const restoredValue = value
    .split('')
    .reverse()
    .join('')

  return [restoredKey, restoredValue]
}

export const removeQuotesFromValue = value => {
  return value.replace(/^'|'$/g, '').replace(/^"|"$/g, '')
}

const checkURLValidation = value => {
  try {
    return !!new URL(value)
  } catch (error) {
    return false
  }
}

export const getOptionsFromArgs = (args, propsConfig = {}) => {
  const parsedArguments = { values: [] }
  const booleanOptionNames = Object.keys(propsConfig).filter(propName => {
    return propsConfig[propName].type === optionTypes.BOOLEAN
  })
  const booleanOptionAliasesNames = booleanOptionNames.reduce(
    (aliases, optionName) => [...aliases, propsConfig[optionName].alias],
    []
  )
  const booleanOptions = [...booleanOptionNames, ...booleanOptionAliasesNames]

  for (let argIndex = 0; argIndex < args.length; argIndex++) {
    const arg = args[argIndex]
    const nextArg = args[argIndex + 1] || ''

    const isArgOption = arg.startsWith('-')
    const isNextArgOption = nextArg.startsWith('-')

    const isArgOptionWithRowValue = isArgOption && arg.includes('=') && /^\w+=.+/.test(arg)

    const formattedArg = arg.replace(/^--|^-/, '')

    const isArgOptionSetBoolean = isArgOption && booleanOptions.includes(formattedArg)

    if (isArgOptionSetBoolean) {
      parsedArguments[formattedArg] = true
    } else if (isArgOptionWithRowValue) {
      const [key, value] = getRowDataFromOption(arg)

      const isValueWithRowValue = value.includes('=') && !checkURLValidation(value)
      const [nextKey, nextValue] = isValueWithRowValue ? getRowDataFromOption(value) : []

      const formattedKey = key.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      const newValue = isValueWithRowValue
        ? { [nextKey]: evaluateStringifiedPrimitiveValue(nextValue) }
        : evaluateStringifiedPrimitiveValue(value)

      parsedArguments[formattedKey] = [...carriedParsedArguments, newValue]
    } else if (isArgOption) {
      const isNextArgOptionWithRowValue =
        !isNextArgOption &&
        nextArg.includes('=') &&
        !checkURLValidation(nextArg) &&
        /^[^\s]+=.+/.test(nextArg)
      const [nextKey, nextValue] = isNextArgOptionWithRowValue ? getRowDataFromOption(nextArg) : []

      const carriedParsedArguments = parsedArguments[formattedArg] || []

      const newValue = isNextArgOptionWithRowValue
        ? { [nextKey]: evaluateStringifiedPrimitiveValue(nextValue) }
        : evaluateStringifiedPrimitiveValue(nextArg)

      argIndex++
      parsedArguments[formattedArg] = [...carriedParsedArguments, newValue]
    } else {
      const carriedParsedArguments = parsedArguments.values

      parsedArguments.values = [...carriedParsedArguments, arg]
    }
  }

  return parsedArguments
}

const evaluateStringifiedPrimitiveValue = value => {
  const isNumber = !Number.isNaN(Number(value))
  const isBoolean = ['true', 'false'].includes(value)

  if (isNumber) return Number(value)
  else if (isBoolean) return value === 'true'
  else return removeQuotesFromValue(value)
}

const validatePropValue = (value, type, defaultValue, objectTypes) => {
  switch (type) {
    case optionTypes.OBJECT: {
      const isArray = Array.isArray(value)
      const hasAllObjects = isArray && value.every(item => typeof item === 'object')

      return hasAllObjects
        ? value.reduce((accumulator, item) => {
            const [[key, value]] = Object.entries(item)

            if (objectTypes?.length) {
              return objectTypes.includes(typeof value)
                ? { ...accumulator, [key]: value }
                : accumulator
            }

            return { ...accumulator, [key]: value }
          }, {})
        : defaultValue
    }

    case optionTypes.ARRAY_OF_STRINGS: {
      const isArray = Array.isArray(value)
      const hasAllStrings = isArray && value.every(item => typeof item === 'string')

      return hasAllStrings ? value : defaultValue
    }

    case optionTypes.NUMBER:
    case optionTypes.STRING: {
      const isArray = Array.isArray(value)
      const lastItem = isArray ? value.at(-1) : null

      return typeof lastItem === type ? lastItem : defaultValue
    }

    case optionTypes.ARRAY:
      return Array.isArray(value) ? value : defaultValue

    case optionTypes.GROUP:
      return typeof value === 'object' ? value : defaultValue

    default:
      return typeof value === type ? value : defaultValue
  }
}

const buildGroupProps = ({ values: _values, ...propValues }, groupPropConfigs = {}) => {
  return Object.entries(propValues).reduce((allProps, [name, value]) => {
    const groupConfig = groupPropConfigs.find(groupPropConfig => groupPropConfig.key === name)

    if (!groupConfig) return allProps

    const validatedValue = validatePropValue(
      value,
      groupConfig.type,
      groupConfig.defaultValue,
      groupConfig.objectTypes
    )

    return { ...allProps, [groupConfig.key]: validatedValue }
  }, {})
}

export const buildProps = (propValues, propsConfig = []) => {
  return propsConfig.reduce(
    (allProps, { key, type, defaultValue, alias, groupProps, objectTypes }) => {
      const propName = kebabize(key)
      const aliasName = Object.keys(propValues).find(name => {
        return alias === name
      })

      const groupValue = groupProps ? buildGroupProps(propValues, groupProps) : null

      const value = groupValue || propValues[propName] || propValues[aliasName]
      const validatedValue = validatePropValue(value, type, defaultValue, objectTypes)

      return { ...allProps, [key]: validatedValue }
    },
    {}
  )
}

export const getParamsByType = (type, params) => {
  return params.reduce((acc, param) => {
    return param.type === type ? [...acc, ...param.value] : acc
  }, [])
}

const paramSyntaxPattern = /^\$\d+$/
export const parseValuesIntoParams = (values, posibleParams) => {
  return values.reduce((params, value) => {
    if (paramSyntaxPattern.test(value)) {
      const paramIndex = Number(value.replace('$', ''))
      const isParamIndexValid = paramIndex + 1 <= posibleParams.length

      return isParamIndexValid ? params.concat(posibleParams[paramIndex]) : params
    }

    return params
  }, [])
}

export const insertParams = (id, newParam) => {
  const formatter = oldParams => {
    const hasOldParam = oldParams.some(param => param.id === id)

    const overwrittenParams = oldParams.map(param => (param.id === id ? newParam : param))

    return hasOldParam ? overwrittenParams : [...oldParams, newParam]
  }

  return { formatter, break: false }
}
