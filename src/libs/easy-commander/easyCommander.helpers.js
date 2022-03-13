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

export const splitArgsTakingInCountSymbols = (args) => {
  let carriedArgsWithQuotes = []
  let indexesToBreak = []
  let shouldCarryArgs = false

  const argsByQuotes = args.reduce((parsedArguments, argument, index) => {
    const hasQuotes = argument.includes('"')
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

  return breakArrayInCertainIndexes(argsByQuotes, indexesToBreak)
}

const getRowDataFromOption = (option) => {
  const rowDataReversedPattern = /(?<value>.+)=(?<key>.+)/g
  const reversedOption = option.split('').reverse().join('')

  const {
    groups: { key, value }
  } = rowDataReversedPattern.exec(reversedOption)

  const restoredKey = key.split('').reverse().join('')
  const restoredValue = value.split('').reverse().join('')

  return [restoredKey, restoredValue]
}

const removeQuotesFromValue = (value) => {
  return value.replace(/^'|'$/g, '').replace(/^"|"$/g, '')
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

      const formattedKey = key.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      parsedArguments[formattedKey] = [
        ...carriedParsedArguments,
        removeQuotesFromValue(value)
      ]
    } else if (isArgOptionBoolean) {
      const formattedKey = arg.replace(/^--|^-/, '')

      parsedArguments[formattedKey] = true
    } else if (isArgOption) {
      const formattedKey = arg.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      argIndex++
      parsedArguments[formattedKey] = [
        ...carriedParsedArguments,
        removeQuotesFromValue(nextArg)
      ]
    } else {
      const carriedParsedArguments = parsedArguments.values

      parsedArguments.values = [...carriedParsedArguments, arg]
    }
  }

  return parsedArguments
}
