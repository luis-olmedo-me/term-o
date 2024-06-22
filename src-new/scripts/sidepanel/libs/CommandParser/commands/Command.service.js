import { createUUIDv4 } from '@src/helpers/utils.helpers'

const defaultValues = {
  string: '',
  boolean: false,
  number: 0,
  array: [],
  object: {},
  none: null
}

export class Command {
  constructor(command) {
    this.id = createUUIDv4()
    this.command = command
    this.propTypes = {}
    this.defaults = {}
    this.outputs = []
    this.handler = null
  }

  setHandler(handler) {
    this.handler = handler

    return this
  }

  expect({ name, type, defaultValue }) {
    const value = defaultValue || defaultValues[type] || defaultValues.none

    this.propTypes = { ...this.propTypes, [name]: type }
    this.defaults = { ...this.defaults, [name]: value }

    return this
  }

  execute() {
    if (!this.handler) throw new Error('Missing handler!')

    this.handler({ ...this.defaults })
  }
}
