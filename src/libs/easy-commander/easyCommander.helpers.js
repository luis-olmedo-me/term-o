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

export const splitArgsTakingInCountQuotes = (args) => {
  let carriedArgsWithQuotes = []
  let shouldCarryArgs = false

  return args.reduce((parsedArguments, argument, index) => {
    const hasQuotes = argument.includes('"')
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
    }

    return [...parsedArguments, argument]
  }, [])
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

export const getOptionsFromArgs = (args) => {
  const parsedArgs = splitArgsTakingInCountQuotes(args)

  const parsedArguments = { values: [] }

  for (let argIndex = 0; argIndex < parsedArgs.length; argIndex++) {
    const arg = parsedArgs[argIndex]
    const nextArg = parsedArgs[argIndex + 1] || ''

    const isOption = arg.startsWith('-')
    const isOptionWithRowValue = isOption && arg.includes('=')
    const isOptionBoolean = isOption && (nextArg.startsWith('-') || !nextArg)

    if (isOptionWithRowValue) {
      const [key, value] = getRowDataFromOption(arg)

      const formattedKey = key.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      parsedArguments[formattedKey] = [...carriedParsedArguments, value]
    } else if (isOptionBoolean) {
      const formattedKey = arg.replace(/^--|^-/, '')

      parsedArguments[formattedKey] = true
    } else if (isOption) {
      const formattedKey = arg.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      parsedArguments[formattedKey] = [...carriedParsedArguments, nextArg]
    } else {
      const carriedParsedArguments = parsedArguments.values

      parsedArguments.values = [...carriedParsedArguments, arg]
    }
  }

  return parsedArguments
}
