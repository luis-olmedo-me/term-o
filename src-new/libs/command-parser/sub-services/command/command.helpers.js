import { getColor as C } from '@src/theme/theme.helpers'

const parseOptions = (index, arg, argsBySpace, type) => {
  switch (type) {
    case 'string': {
      index++
      const argStart = argsBySpace.at(index) || ''
      const quote = argStart.charAt(0)
      const isQuote = /"|'/g.test(quote)
      const argStartIsLastQuoted = argStart.endsWith(quote)

      if (!isQuote) throw `${arg} expects for quoted [string] value.`

      const quotesPattern = new RegExp(`${quote}|${quote}^$`, 'g')

      if (!argStartIsLastQuoted) index++
      let value = argStart
      const nextArgs = argStartIsLastQuoted ? [] : argsBySpace.slice(index)

      for (const nextArg of nextArgs) {
        if (nextArg.endsWith(quote)) {
          value += ` ${nextArg}`
          index++
          break
        }

        value += ` ${nextArg}`
        index++
      }

      value = value.replace(quotesPattern, '')

      return { value: value || null, newIndex: index }
    }

    case 'boolean': {
      return { value: true, newIndex: index }
    }

    case 'number': {
      const nextArg = argsBySpace.at(++index)
      const value = Number(nextArg)
      const isValidNumber = !Number.isNaN(value)

      if (!isValidNumber) throw `"${C`bright-red`}${nextArg}${C`red`}" is not a valid number.`

      return { value, newIndex: index }
    }

    case 'array': {
      const nextArgs = argsBySpace.slice(index)
      let value = []

      for (const nextArg of nextArgs) {
        if (nextArg.startsWith('--')) break

        value = [...value, nextArg]
        index++
      }

      return { value, newIndex: index }
    }

    default:
      throw `Option type ${C`bright-red`}${type}${C`red`} is not recognized.`
  }
}

const getNextArg = (args, index, replaceables, isBoolean) => {
  const nextArg = args[index + 1]

  if (nextArg === '$' && !isBoolean && replaceables) {
    return replaceables
  }

  return nextArg
}

export const getPropsFromString = (command, args, replaceables) => {
  let props = {}

  for (let index = 0; index < args.length; index++) {
    const arg = args[index]

    if (arg.startsWith('--')) {
      const propName = arg.slice(2)
      const option = command.options.getByName(propName)

      const isBoolean = option.type === 'boolean'
      const nextArg = getNextArg(args, index, replaceables, isBoolean)

      if (nextArg === '$' && !isBoolean) {
        index += 2
        option.holdUp()
        continue
      }

      const { value, newIndex } = parseOptions(index, arg, args, option.type)

      if (value === null) throw `${C`bright-red`}${arg}${C`red`} prop has an unexpected value.`
      option.validate(value)

      index = newIndex
      props = { ...props, [option.name]: value }
      continue
    }
    if (arg.startsWith('-')) {
      const propAbbreviation = arg.slice(1)
      const option = command.options.getByAbbreviation(propAbbreviation)

      const isBoolean = option.type === 'boolean'
      const nextArg = getNextArg(args, index, replaceables, isBoolean)

      if (nextArg === '$' && !isBoolean) {
        index += 2
        option.holdUp()
        continue
      }

      const { value, newIndex } = parseOptions(index, arg, args, option.type)

      if (value === null) throw `${C`bright-red`}${arg}${C`red`} option has an unexpected value.`
      option.validate(value)

      index = newIndex
      props = { ...props, [option.name]: value }
      continue
    }

    throw `${C`bright-red`}${arg}${C`red`} is an unexpected argument.`
  }

  return props
}

export const executePerUpdates = async (command, updates) => {
  for (let update of updates) {
    command.prepare(command.args, '"img"')

    command.options.updatables.forEach(option => {
      option.setValue({ ...command.props, [option.name]: '"img"' })
    })

    await command.execute()
  }
}
