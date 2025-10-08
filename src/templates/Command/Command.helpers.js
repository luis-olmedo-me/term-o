import { statuses } from './Command.constants'

export const getArray = value => {
  const items = value.slice(1).slice(0, -1)
  const itemsAsArgs = getArgs(items)

  return itemsAsArgs.map(item => {
    return /^"|^'/.test(item) ? item.slice(1).slice(0, -1) : ''
  })
}

const parseOptions = (index, arg, argsBySpace, type) => {
  switch (type) {
    case 'string': {
      index++
      const argValue = argsBySpace.at(index) || ''
      const quote = argValue.charAt(0)

      const startsWithQuote = /"|'/g.test(quote)
      const endsWithQUote = argValue.endsWith(quote)

      if ((!startsWithQuote || !endsWithQUote) && !argValue)
        throw `${arg} expects for quoted [string] value. Instead, it received nothing.`

      if (!startsWithQuote || !endsWithQUote)
        throw `${arg} expects for quoted [string] value. Instead, it received ${argValue}.`

      const quotesPattern = new RegExp(`^${quote}|${quote}$`, 'g')
      const value = argValue.replace(quotesPattern, '')

      if (!value)
        throw `${arg} expects for content inside of quoted [string] value. Instead, it received ${argValue}.`

      return { value, newIndex: index }
    }

    case 'boolean': {
      return { value: true, newIndex: index }
    }

    case 'number': {
      const nextArg = argsBySpace.at(++index)
      const value = Number(nextArg)
      const isValidNumber = !Number.isNaN(value)

      if (!isValidNumber) throw `"${arg}" expects [number] value. Instead, it received ${nextArg}.`

      return { value, newIndex: index }
    }

    case 'string-array': {
      index++
      const argValue = argsBySpace.at(index) || ''

      const startsWithBracket = argValue.startsWith('[')
      const endsWithBracket = argValue.endsWith(']')

      if ((!startsWithBracket || !endsWithBracket) && !argValue)
        throw `${arg} expects for [string-array] value. Instead, it received nothing.`

      if (!startsWithBracket || !endsWithBracket)
        throw `${arg} expects for [string-array] value. Instead, it received ${argValue}.`

      const arrayValue = getArray(argValue)
      const isValidValue = arrayValue.every(value => {
        const isString = typeof value === 'string'
        const hasContent = Boolean(value)

        return isString && hasContent
      })
      const hasItems = arrayValue.length > 0

      if (!isValidValue || !hasItems)
        throw `${arg} expects for valid content in [string-array] value(s). Instead, it received ${argValue}.`

      return { value: arrayValue, newIndex: index }
    }

    default:
      throw `Option type ${type} is not recognized.`
  }
}

const isParam = (option, arg) => {
  const isBoolean = option.type === 'boolean'

  const paramPattern = /^\$\d+(,\d+)?(-\d+)?$/
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

      if (typeof props[option.name] !== 'undefined') throw `${argValue} is a repeated argument.`

      if (isParam(option, nextArg)) {
        index++
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

      if (typeof props[option.name] !== 'undefined') throw `${argValue} is a repeated argument.`

      if (isParam(option, nextArg)) {
        index++
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

    throw `${argValue} is an unexpected argument.`
  }

  return props
}

export const getArgs = value => {
  const fragments = value.split(' ')

  let output = []
  const addFragment = (...fragment) => {
    output = output.concat(...fragment)
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]

    if (!fragment) continue

    const startsWithQuote = /^"|^'/g.test(fragment)
    const startsWithBracket = /^\[/g.test(fragment)
    const isFlag = /^-([a-zA-Z]+)/g.test(fragment)

    if (startsWithBracket) {
      const startBrancket = '['
      const endBrancket = ']'
      const endsWithQuote = fragment.endsWith(endBrancket)

      if (endsWithQuote && fragment.length > 1) {
        addFragment(fragment)
        continue
      }

      const nextFragments = fragments.slice(++index)
      let fragmentValue = fragment
      let ignoredEndBrackets = 0

      for (const nextFragment of nextFragments) {
        fragmentValue += ` ${nextFragment}`

        if (nextFragment.startsWith(startBrancket)) ++ignoredEndBrackets
        if (nextFragment.endsWith(endBrancket) && !ignoredEndBrackets) break
        if (nextFragment.endsWith(endBrancket) && ignoredEndBrackets) --ignoredEndBrackets

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
    if (isFlag) {
      const flags = fragment
        .replace('-', '')
        .split('')
        .map(flag => `-${flag}`)

      addFragment(...flags)
      continue
    }

    addFragment(fragment)
  }

  return output
}

const getParamValue = (indexes, values) => {
  if (indexes.length === 1) {
    const [index] = indexes

    return values[index] || ''
  }

  const parsedValues = indexes.map(index => values[index]).filter(Boolean)
  const valuesInLine = parsedValues.join(' ')

  if (!parsedValues.length) return ''

  return `[ ${valuesInLine} ]`
}

export const executePerUpdates = async (nextCommand, updates) => {
  const argsHoldingUp = nextCommand.args.filter(arg => arg.isHoldingUp)
  const colorPattern = /\[termo\.color\.[A-Za-z]+\]|\[termo\.bgcolor\.[A-Za-z]+\]/g

  nextCommand.allowToExecuteNext(false)

  for (let update of updates) {
    const cleanedUpdate = update.replace(colorPattern, '')
    const availableArgs = getArgs(cleanedUpdate)

    argsHoldingUp.forEach(arg => {
      const indexes = arg.getIndexes()
      const newValue = getParamValue(indexes, availableArgs)

      arg.setValue(newValue)
    })

    nextCommand.prepare()

    if (nextCommand.status === statuses.ERROR) break
    await nextCommand.execute()
    nextCommand.saveUpdates()
    if (nextCommand.status === statuses.ERROR) break
  }

  if (nextCommand.nextCommand && !nextCommand.failed) {
    await nextCommand.executeNext()
  }
}
