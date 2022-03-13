export const parsePropsIntoSuggestions = (propsConfigs, props) => {
  if (!propsConfigs) return []

  const propsInUse = Object.keys(props)

  return Object.keys(propsConfigs).reduce((result, key) => {
    const propConfig = propsConfigs[key]
    const isInUse =
      propsInUse.includes(key) ||
      propConfig.aliases.some((alias) => propsInUse.includes(alias))

    const groupProps = parsePropsIntoSuggestions(propConfig.groupProps, props)

    const newValue = groupProps.length
      ? groupProps
      : [
          {
            ...propConfig,
            aliases: propConfig.aliases.map((alias) => `-${alias}`),
            value: `--${key}`
          }
        ]

    return !isInUse ? [...result, ...newValue] : result
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

  const argsByQuotes = args.reduce((parsedArguments, argument, index) => {
    const hasQuotes = argument.includes(_quotes || '"')
    const isVerticalLine = argument.includes('|')
    const isLastArgument = index === args.length - 1

    if (hasQuotes) {
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

    const isArgOptionWithRowValue = isArgOption && arg.includes('=')

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
        !checkURLValidation(nextArg)
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

export const validatePropValue = (value, type, defaultValue) => {
  switch (type) {
    case 'array-of-objects': {
      const isArray = Array.isArray(value)
      const hasAllObjects =
        isArray && value.every((item) => typeof item === 'object')

      return hasAllObjects ? value : defaultValue
    }

    case 'array-of-strings': {
      const isArray = Array.isArray(value)
      const hasAllStrings =
        isArray && value.every((item) => typeof item === 'string')

      return hasAllStrings ? value : defaultValue
    }

    case 'string': {
      const isArray = Array.isArray(value)
      const lastItem = isArray ? value[value.length - 1] : ''

      return lastItem || defaultValue
    }

    case 'array':
      return Array.isArray(value) ? value : defaultValue

    default:
      return typeof value === type ? value : defaultValue
  }
}
