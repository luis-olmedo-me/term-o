import { stringifyFragments } from './command.helpers'
import { isArray, isQuoted } from './string.helpers'
import { countMatches, getQuotedString } from './utils.helpers'

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
      const nextFragments = fragments.slice(index + 1)

      const closedBracketCount = countMatches(fragment, /\]/g)
      let openBracketCount = countMatches(fragment, /\[/g)
      let fragmentValue = fragment

      openBracketCount -= closedBracketCount

      for (const nextFragment of nextFragments) {
        if (openBracketCount <= 0) break
        const nextOpenBracketCount = countMatches(nextFragment, /\[/g)
        const nextClosedBracketCount = countMatches(nextFragment, /\]/g)

        openBracketCount += nextOpenBracketCount - nextClosedBracketCount
        fragmentValue += ` ${nextFragment}`
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
  const inner = value.slice(1, -1)
  const args = getArgs(inner)

  const result = []

  for (const arg of args) {
    const parsed = parseArrayItem(arg)

    if (parsed === null) return null

    result.push(parsed)
  }

  return result
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

const parseArrayItem = value => {
  if (isQuoted(value)) {
    return value.slice(1, -1)
  }

  if (value === 'true') return true
  if (value === 'false') return false

  if (isArray(value)) return getArray(value)

  const num = Number(value)
  if (!Number.isNaN(num)) return num

  return null
}
