import { optionTypes } from './constants/commands.constants'

export const parsePropsIntoSuggestions = (propsConfigs) => {
  if (!propsConfigs) return []

  return Object.keys(propsConfigs).reduce((result, key) => {
    const propConfig = propsConfigs[key]

    const groupProps = parsePropsIntoSuggestions(propConfig.groupProps)

    const newValue = groupProps.length
      ? groupProps
      : [
          {
            ...propConfig,
            aliases: propConfig.aliases.map((alias) => `-${alias}`),
            value: `--${key}`
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

export const splitArgsTakingInCountSymbols = (args, _quotes) => {
  let carriedArgsWithQuotes = []
  let indexesToBreak = []
  let shouldCarryArgs = false
  const quotesToUse = _quotes || '"'

  const argsByQuotes = args.reduce((parsedArguments, argument, index) => {
    const hasQuotes = argument.includes(quotesToUse)
    const hasAllQuotes =
      argument.startsWith(quotesToUse) && argument.endsWith(quotesToUse)
    const isVerticalLine = argument === '|'
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
      }

      return newParsedArguments
    } else if (shouldCarryArgs) {
      carriedArgsWithQuotes = [...carriedArgsWithQuotes, argument]

      return isLastArgument
        ? [...parsedArguments, carriedArgsWithQuotes.join(' ')]
        : parsedArguments
    } else if (isVerticalLine) {
      indexesToBreak = [...indexesToBreak, index]
    }

    return [...parsedArguments, argument]
  }, [])

  return _quotes
    ? breakArrayInCertainIndexes(argsByQuotes, indexesToBreak)
    : splitArgsTakingInCountSymbols(argsByQuotes, "'")
}

const getRowDataFromOption = (option) => {
  const rowDataReversedPattern = /(?<value>.+)=(?<key>.+)/g
  const reversedOption = option.split('').reverse().join('')

  const {
    groups: { key = '', value = '' }
  } = rowDataReversedPattern.exec(reversedOption) || { groups: {} }

  const restoredKey = key.split('').reverse().join('')
  const restoredValue = value.split('').reverse().join('')

  return [restoredKey, restoredValue]
}

const removeQuotesFromValue = (value) => {
  return value.replace(/^'|'$/g, '').replace(/^"|"$/g, '')
}

const checkURLValidation = (value) => {
  try {
    return !!new URL(value)
  } catch (error) {
    return false
  }
}

export const getOptionsFromArgs = (args) => {
  const parsedArguments = { values: [] }

  for (let argIndex = 0; argIndex < args.length; argIndex++) {
    const arg = args[argIndex]
    const nextArg = args[argIndex + 1] || ''

    const isArgOption = arg.startsWith('-')
    const isNextArgOption = nextArg.startsWith('-')

    const isArgOptionWithRowValue =
      isArgOption && arg.includes('=') && /^\w+=.+/.test(arg)

    const isArgOptionBoolean = isArgOption && (isNextArgOption || !nextArg)

    if (isArgOptionWithRowValue) {
      const [key, value] = getRowDataFromOption(arg)

      const isValueWithRowValue =
        value.includes('=') && !checkURLValidation(value)
      const [nextKey, nextValue] = isValueWithRowValue
        ? getRowDataFromOption(value)
        : []

      const formattedKey = key.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      const newValue = isValueWithRowValue
        ? { [nextKey]: removeQuotesFromValue(nextValue) }
        : removeQuotesFromValue(value)

      parsedArguments[formattedKey] = [...carriedParsedArguments, newValue]
    } else if (isArgOptionBoolean) {
      const formattedKey = arg.replace(/^--|^-/, '')

      parsedArguments[formattedKey] = true
    } else if (isArgOption) {
      const isNextArgOptionWithRowValue =
        !isNextArgOption &&
        nextArg.includes('=') &&
        !checkURLValidation(nextArg) &&
        /^\w+=.+/.test(nextArg)
      const [nextKey, nextValue] = isNextArgOptionWithRowValue
        ? getRowDataFromOption(nextArg)
        : []

      const formattedKey = arg.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      const newValue = isNextArgOptionWithRowValue
        ? { [nextKey]: removeQuotesFromValue(nextValue) }
        : removeQuotesFromValue(nextArg)

      argIndex++
      parsedArguments[formattedKey] = [...carriedParsedArguments, newValue]
    } else {
      const carriedParsedArguments = parsedArguments.values

      parsedArguments.values = [...carriedParsedArguments, arg]
    }
  }

  return parsedArguments
}

const validatePropValue = (value, type, defaultValue) => {
  switch (type) {
    case optionTypes.ARRAY_OF_OBJECTS: {
      const isArray = Array.isArray(value)
      const hasAllObjects =
        isArray && value.every((item) => typeof item === 'object')

      return hasAllObjects ? value : defaultValue
    }

    case optionTypes.ARRAY_OF_STRINGS: {
      const isArray = Array.isArray(value)
      const hasAllStrings =
        isArray && value.every((item) => typeof item === 'string')

      return hasAllStrings ? value : defaultValue
    }

    case optionTypes.STRING: {
      const isArray = Array.isArray(value)
      const lastItem = isArray ? value[value.length - 1] : ''

      return lastItem || defaultValue
    }

    case optionTypes.ARRAY:
      return Array.isArray(value) ? value : defaultValue

    default:
      return typeof value === type ? value : defaultValue
  }
}

const buildGroupProps = (
  { values: _values, ...propValues },
  groupPropConfigs = {}
) => {
  return Object.entries(propValues).reduce((allProps, [name, value]) => {
    const groupConfig = groupPropConfigs[name]

    if (!groupConfig) return allProps

    const validatedValue = validatePropValue(
      value,
      groupConfig.type,
      groupConfig.defaultValue
    )

    return { ...allProps, [groupConfig.key]: validatedValue }
  }, {})
}

export const buildProps = (propValues, propsConfig = {}) => {
  return Object.entries(propsConfig).reduce(
    (
      allProps,
      [propName, { key, type, defaultValue, aliases, groupProps }]
    ) => {
      const aliasName = Object.keys(propValues).find((name) => {
        return aliases.includes(name)
      })

      const groupValue = groupProps
        ? buildGroupProps(propValues, groupProps)
        : null

      const value = propValues[propName] || propValues[aliasName] || groupValue
      const validatedValue = validatePropValue(value, type, defaultValue)

      return { ...allProps, [key]: validatedValue }
    },
    {}
  )
}
