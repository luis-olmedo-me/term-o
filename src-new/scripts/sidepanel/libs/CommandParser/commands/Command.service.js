import { createUUIDv4 } from '@src/helpers/utils.helpers'

const defaultValues = {
  string: '',
  boolean: false,
  number: 0,
  array: [],
  none: null
}

const parseOptions = (index, arg, argsBySpace, propType) => {
  switch (propType) {
    case 'string': {
      index++
      const argStart = argsBySpace.at(index) || ''
      const quote = argStart.charAt(0)

      const isQuote = /"|'/g.test(quote)
      if (!isQuote) return { value: null, newIndex: index }

      index++
      let value = argStart.replace(new RegExp(`^${quote}`), '')
      const nextArgs = argsBySpace.slice(index)

      for (const nextArg of nextArgs) {
        if (nextArg.endsWith(quote)) {
          value += ` ${nextArg.replace(new RegExp(`${quote}$`), '')}`
          index++
          break
        }

        value += ` ${nextArg}`
        index++
      }

      return { value: value || null, newIndex: index }
    }

    case 'boolean': {
      return { value: true, newIndex: index }
    }

    case 'number': {
      const nextArg = argsBySpace.at(++index)
      const value = Number(nextArg)

      return { value: Number.isNaN(value) ? null : value, newIndex: index }
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
      return { value: null, newIndex: index }
  }
}

export class Command {
  constructor(name, command) {
    this.id = createUUIDv4()
    this.name = name
    this.command = command
    this.propTypes = {}
    this.props = {}
    this.defaults = { carry: [] }
    this.outputs = []
    this.handler = null
  }

  setHandler(handler) {
    this.handler = handler

    return this
  }

  expect({ name, type, defaultValue }) {
    const value = (defaultValue || defaultValues[type]) ?? defaultValues.none

    this.propTypes = { ...this.propTypes, [name]: type }
    this.defaults = { ...this.defaults, [name]: value }

    return this
  }

  prepare(args) {
    this.props = this.defaults

    for (let index = 0; index < args.length; index++) {
      const arg = args[index]

      if (arg.startsWith('--')) {
        const prop = arg.slice(2)
        const propType = this.propTypes[prop]
        const { value, newIndex } = parseOptions(index, arg, args, propType)

        index = newIndex

        if (value !== null) {
          this.props = { ...this.props, [prop]: value }
        }

        continue
      }

      this.props = { ...this.props, carry: [...this.props.carry, arg] }
    }

    return this
  }

  execute() {
    if (!this.handler) throw new Error('Missing handler!')

    this.handler(this)

    return this
  }
}
