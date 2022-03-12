import commandParser from 'minimist'

const decodeStringValue = (value) => {
  return decodeURI(value).replace(/^"|"$/g, '')
}

export const parseArgsIntoCommands = (args) => {
  const line = args
    .join(' ')
    .replace(/"(\w|\s|-)+"/g, encodeURI)
    .split(' ')

  const object = commandParser(line)

  return Object.entries(object).reduce((parsedObject, [key, value]) => {
    const valueType = typeof value
    const isObject = typeof value === 'object'

    const objectValidatedType = Array.isArray(value) ? 'array' : valueType
    const validatedValueType = isObject ? objectValidatedType : valueType

    switch (validatedValueType) {
      case 'string':
        return {
          ...parsedObject,
          [key]: decodeStringValue(value)
        }

      case 'array':
        return {
          ...parsedObject,
          [key]: value?.map((item) => {
            const itemStringified = String(item)

            return decodeStringValue(itemStringified)
          })
        }

      case 'number':
        return {
          ...parsedObject,
          [key]: String(value)
        }

      default:
        return {
          ...parsedObject,
          [key]: value
        }
    }
  }, {})
}

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

export const splitArgsTakingInCountQuotes = (line) => {
  const args = line.split(' ')

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

export const parseArgsIntoCommands1 = (line) => {
  const args = splitArgsTakingInCountQuotes(line)

  const parsedArguments = {}

  for (let argIndex = 0; argIndex < args.length; argIndex++) {
    const arg = args[argIndex]

    const isOption = arg.startsWith('-')
    const isOptionWithRowValue = isOption && arg.includes('=')

    if (isOptionWithRowValue) {
      const [key, value] = getRowDataFromOption(arg)

      const formattedKey = key.replace(/^--|^-/, '')
      const carriedParsedArguments = parsedArguments[formattedKey] || []

      parsedArguments[formattedKey] = [...carriedParsedArguments, value]
    }
  }

  return parsedArguments
}
