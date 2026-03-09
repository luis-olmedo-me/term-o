import { stringifyFragments } from './command.helpers'
import { getQuotedString } from './utils.helpers'

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
    const isFlag = /^-([a-zA-Z]+)$/g.test(fragment)

    if (startsWithBracket) {
      const nextFragments = fragments.slice(++index)

      const closedBracketCount = Array.from(fragment.matchAll(/\]/g)).length
      let openBracketCount = Array.from(fragment.matchAll(/\[/g)).length
      let fragmentValue = fragment

      openBracketCount -= closedBracketCount

      for (const nextFragment of nextFragments) {
        const nextOpenBracketCount = Array.from(nextFragment.matchAll(/\[/g)).length
        const nextClosedBracketCount = Array.from(nextFragment.matchAll(/\]/g)).length
        fragmentValue += ` ${nextFragment}`

        openBracketCount += nextOpenBracketCount - nextClosedBracketCount

        if (openBracketCount <= 0) break

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

export const splitBy = (value, key) => {
  const fragments = getArgs(value)

  let output = []
  let outputIndex = 0
  const addFragment = fragment => {
    const carried = output[outputIndex]

    output[outputIndex] = carried ? `${carried} ${fragment}` : fragment
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]
    const isKey = fragment === key

    if (isKey) {
      outputIndex++
      continue
    }

    addFragment(fragment)
  }

  return output
}

export const getArray = value => {
  const items = value.slice(1).slice(0, -1)
  const itemsAsArgs = getArgs(items)

  return itemsAsArgs.map(item => {
    const isQuoted = item.startsWith("'") && item.endsWith("'")
    const isDoubleQuoted = item.startsWith('"') && item.endsWith('"')
    const isBracketed = item.startsWith('[') && item.endsWith(']')
    const isTrue = item === 'true'
    const isFalse = item === 'false'
    const isNumber = !Number.isNaN(Number(item))

    if (isDoubleQuoted || isQuoted) return item.slice(1).slice(0, -1)
    if (isTrue || isFalse) return isTrue
    if (isBracketed) return getArray(item)
    if (isNumber) return Number(item)
    return ''
  })
}

export const getArrayAsLine = value => {
  const arrayValuesAsLine = value.reduce((line, arg, index) => {
    const isArray = Array.isArray(arg)
    const space = index === 0 ? '' : ' '

    return isArray ? `${line}${space}${getArrayAsLine(arg)}` : `${line}${space}${arg}`
  }, '')

  return `[${arrayValuesAsLine}]`
}

export const buildArgsFromProps = (props, name = null) => {
  const defaultValue = name ? [name] : []

  return Object.entries(props).reduce((args, [name, value]) => {
    switch (typeof value) {
      case 'object': {
        const isArray = Array.isArray(value)

        return isArray ? [...args, `--${name}`, getArrayAsLine(value)] : args
      }

      case 'boolean': {
        return [...args, `--${name}`]
      }

      case 'string': {
        return [...args, `--${name}`, getQuotedString(value)]
      }

      default: {
        return [...args, `--${name}`, value]
      }
    }
  }, defaultValue)
}

export const getRawArgs = value => {
  const args = getArgs(value)

  return args.reduce((rawArgs, arg) => {
    if (arg.startsWith('"') && arg.endsWith('"')) return [...rawArgs, arg.slice(1, -1)]
    if (arg.startsWith("'") && arg.endsWith("'")) return [...rawArgs, arg.slice(1, -1)]
    return [...rawArgs, arg]
  }, [])
}

export const getParamValue = (indexes, values) => {
  if (indexes.length === 1) {
    const [index] = indexes
    const value = values[index]
    const isArrayValue = Array.isArray(value)

    if (isArrayValue) return `[${stringifyFragments(value)}]`

    return typeof value !== 'undefined' ? value : null
  }

  const params = indexes.map(index => values[index]).filter(value => typeof value !== 'undefined')

  return `[${stringifyFragments(params)}]`
}
