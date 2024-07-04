import { getColor as C } from '@src/theme/theme.helpers'

const parseOptions = (index, arg, argsBySpace, type) => {
  switch (type) {
    case 'string': {
      index++
      const argValue = argsBySpace.at(index) || ''
      const quote = argValue.charAt(0)

      const startsWithQuote = /"|'/g.test(quote)
      const endsWithQUote = argValue.endsWith(quote)

      if ((!startsWithQuote || !endsWithQUote) && !argValue)
        throw `${C`bright-red`}${arg} ${C`red`}expects for quoted ${C`bright-red`}[string]${C`red`} value. Instead, it received nothing.`

      if (!startsWithQuote || !endsWithQUote)
        throw `${C`bright-red`}${arg} ${C`red`}expects for quoted ${C`bright-red`}[string]${C`red`} value. Instead, it received ${C`bright-red`}${argValue}${C`red`}.`

      const quotesPattern = new RegExp(`${quote}|${quote}^$`, 'g')
      const value = argValue.replace(quotesPattern, '')

      if (!value)
        throw `${C`bright-red`}${arg} ${C`red`}expects for content inside of quoted ${C`bright-red`}[string]${C`red`} value. Instead, it received ${C`bright-red`}${argValue}${C`red`}.`

      return { value, newIndex: index }
    }

    case 'boolean': {
      return { value: true, newIndex: index }
    }

    case 'number': {
      const nextArg = argsBySpace.at(++index)
      const value = Number(nextArg)
      const isValidNumber = !Number.isNaN(value)

      if (!isValidNumber)
        throw `"${C`bright-red`}${arg}${C`red`}"expects ${C`bright-red`}[number]${C`red`} value. Instead, it received ${C`bright-red`}${nextArg}${C`red`}.`

      return { value, newIndex: index }
    }

    case 'string-array': {
      index++
      const argValue = argsBySpace.at(index) || ''

      const startsWithBracket = argValue.startsWith('[')
      const endsWithBracket = argValue.endsWith(']')

      if ((!startsWithBracket || !endsWithBracket) && !argValue)
        throw `${C`bright-red`}${arg} ${C`red`}expects for ${C`bright-red`}[string-array]${C`red`} value. Instead, it received nothing.`

      if (!startsWithBracket || !endsWithBracket)
        throw `${C`bright-red`}${arg} ${C`red`}expects for ${C`bright-red`}[string-array]${C`red`} value. Instead, it received ${C`bright-red`}${argValue}${C`red`}.`

      const argValueWithComas = argValue.replaceAll('" "', '","')
      const value = JSON.parse(argValueWithComas)
      const isValidValue = Object.values(value).every(value => typeof value === 'string' && value)

      if (!isValidValue)
        throw `${C`bright-red`}${arg} ${C`red`}expects for content in ${C`bright-red`}[string-array]${C`red`} value(s). Instead, it received ${C`bright-red`}${argValue}${C`red`}.`

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

      const argName = option.displayName
      const { value, newIndex } = parseOptions(index, argName, argValues, option.type)
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

      const argName = option.displayName
      const { value, newIndex } = parseOptions(index, argName, argValues, option.type)
      option.validate(value)
      index = newIndex

      props = { ...props, [option.name]: value }
      continue
    }

    throw `${C`bright-red`}${argValue}${C`red`} is an unexpected argument.`
  }

  return props
}

export const getArgs = value => {
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

        if (nextFragment.endsWith(quote)) break

        index++
      }

      addFragment(fragmentValue)
      continue
    }

    addFragment(fragment)
  }

  return output
}

export const executePerUpdates = async (command, updates) => {
  const argsHoldingUp = command.args.filter(arg => arg.isHoldingUp)
  const colorPattern = /\[termo\.#(?:[0-9a-fA-F]{3}){1,2}\]/g

  for (let update of updates) {
    let cleanedUpdate = update.replace(colorPattern, '')
    const availableArgs = getArgs(cleanedUpdate)

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
