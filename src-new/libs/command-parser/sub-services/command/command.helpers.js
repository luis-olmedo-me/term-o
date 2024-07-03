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

const isParam = (option, arg) => {
  const isBoolean = option.type === 'boolean'

  const paramPattern = /^\$\d+$/g
  const argValue = arg?.value

  return !isBoolean && Boolean(argValue) && paramPattern.test(argValue)
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

      if (isParam(option, nextArg)) {
        index += 2
        nextArg.holdUp()

        continue
      }

      const { value, newIndex } = parseOptions(index, argValue, argValues, option.type)

      if (value === null) throw `${C`bright-red`}${argValue}${C`red`} prop has an unexpected value.`
      option.validate(value)

      index = newIndex
      props = { ...props, [option.name]: value }
      continue
    }
    if (argValue.startsWith('-')) {
      const propAbbreviation = argValue.slice(1)
      const option = command.options.getByAbbreviation(propAbbreviation)
      const nextArg = args[index + 1]

      if (isParam(option, nextArg)) {
        index += 2
        nextArg.holdUp()

        continue
      }

      const { value, newIndex } = parseOptions(index, argValue, argValues, option.type)

      if (value === null)
        throw `${C`bright-red`}${argValue}${C`red`} option has an unexpected value.`
      option.validate(value)

      index = newIndex
      props = { ...props, [option.name]: value }
      continue
    }

    throw `${C`bright-red`}${argValue}${C`red`} is an unexpected argument.`
  }

  return props
}

const getArgs = value => {
  const fragments = value.trim().split(' ')

  let output = []
  const addFragment = fragment => {
    output = output.concat(fragment)
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]

    const startsWithQuote = /^"|^'/g.test(fragment)
    const startsWithBracket = /^\[/g.test(fragment)

    if (startsWithBracket) {
      const endBrancket = ']'
      const endsWithQuote = fragment.endsWith(endBrancket)

      if (endsWithQuote && fragment.length > 1) {
        addFragment(fragment)
        continue
      }

      const nextFragments = fragments.slice(++index)
      let fragmentValue = fragment

      for (const nextFragment of nextFragments) {
        fragmentValue += ` ${nextFragment}`

        if (nextFragment.endsWith(endBrancket)) break

        index++
      }

      addFragment(fragmentValue)
      continue
    }

    if (startsWithQuote) {
      const quote = fragment.charAt(0)
      const endsWithQuote = fragment.endsWith(quote)

      if (endsWithQuote && fragment.length > 1) {
        addFragment(fragment)
        continue
      }

      const nextFragments = fragments.slice(++index)
      let fragmentValue = fragment

      for (const nextFragment of nextFragments) {
        fragmentValue += ` ${nextFragment}`
        index++

        if (nextFragment.endsWith(quote)) break
      }

      addFragment(fragmentValue)
      continue
    }

    addFragment(fragment)
  }

  return output
}

export const executePerUpdates = async (command, updates) => {
  const colorPattern = /\[termo\.#(?:[0-9a-fA-F]{3}){1,2}\]/g

  for (let update of updates) {
    let cleanedUpdate = update.replace(colorPattern, '')

    const availableArgs = getArgs(cleanedUpdate)
    const argsHoldingUp = command.args.filter(arg => arg.isHoldingUp)

    argsHoldingUp.forEach(arg => {
      const index = arg.getIndex()
      const newValue = availableArgs[index] || ''

      arg.setValue(newValue)
    })
    command.prepare()

    if (command.error) break

    await command.execute()
  }
}
