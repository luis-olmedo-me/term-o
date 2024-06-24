import { createUUIDv4 } from '@src/helpers/utils.helpers'
import { defaultValues } from './Command.constants'
import { parseOptions } from './Command.helpers'

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
    if (this.handler) this.handler(this)

    return this
  }
}
