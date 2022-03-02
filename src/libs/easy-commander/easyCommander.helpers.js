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
