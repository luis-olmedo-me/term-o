import { getColor as C } from '@src/theme/theme.helpers'

const parseOptions = (index, arg, argsBySpace, propType) => {
  switch (propType) {
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
      throw 'Something went wrong.'
  }
}

export const getPropsFromString = (command, args) => {
  let props = {}

  for (let index = 0; index < args.length; index++) {
    const arg = args[index]

    if (arg.startsWith('--')) {
      const prop = arg.slice(2)
      const propType = command.propTypes[prop]

      if (!propType) throw `${C`bright-red`}${arg}${C`red`} is not a valid command prop.`

      const { value, newIndex } = parseOptions(index, arg, args, propType)

      if (value === null) throw `${C`bright-red`}${arg}${C`red`} prop has an unexpected value.`

      index = newIndex
      props = { ...props, [prop]: value }
      continue
    }
    if (arg.startsWith('-')) {
      const prop = arg.slice(1)
      const propName = command.abbreviations[prop]

      if (!propName) throw `${C`bright-red`}${arg}${C`red`} is not a valid command prop.`

      const validate = command.validations[propName]
      const propType = command.propTypes[propName]
      const { value, newIndex } = parseOptions(index, arg, args, propType)

      if (value === null) throw `${C`bright-red`}${arg}${C`red`} prop has an unexpected value.`
      if (validate) validate(value)

      index = newIndex
      props = { ...props, [propName]: value }
      continue
    }

    throw `${C`bright-red`}${arg}${C`red`} is an unexpected argument.`
  }

  return props
}

export const validateRequirements = (requirements, newProps) => {
  for (const [propRequester, propsNeeded] of Object.entries(requirements)) {
    const hasNeeded = propsNeeded.some(name => typeof newProps[name] !== 'undefined')
    const needed = propsNeeded.map(name => `${C`bright-red`}--${name}${C`red`}`).join(' or ')

    if (!hasNeeded) {
      throw `${C`bright-red`}--${propRequester}${C`red`} requires: ${needed}`
    }
  }
}
