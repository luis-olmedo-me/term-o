import EventListener from '../event-listener'

import { createUUIDv4 } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'
import { defaultValues } from './command.constants'
import { getPropsFromString } from './command.helpers'

export class Command extends EventListener {
  constructor({ name, command, hidden = false }) {
    super()

    this.id = createUUIDv4()
    this.name = name
    this.command = command
    this.propTypes = {}
    this.abbreviations = {}
    this.data = {}
    this.props = {}
    this.defaults = {}
    this.validations = {}
    this.outputs = []
    this.updates = []
    this.hidden = hidden
    this.finished = false
  }

  reset() {
    this.updates = []

    this.dispatchEvent('update', this)
  }

  update(...updates) {
    this.updates = [...this.updates, ...updates]

    this.dispatchEvent('update', this)
  }

  expect({ name, type, defaultValue, abbreviation, validate }) {
    const value = (defaultValue || defaultValues[type]) ?? defaultValues.none

    this.defaults = { ...this.defaults, [name]: value }
    this.propTypes = { ...this.propTypes, [name]: type }
    if (abbreviation) this.abbreviations = { ...this.abbreviations, [abbreviation]: name }
    if (validate) this.validations = { ...this.validations, [name]: validate }

    return this
  }

  prepare(args) {
    this.props = this.defaults

    try {
      const newProps = getPropsFromString(this, args)
      const hasNewProps = Object.values(newProps).length > 0

      if (!hasNewProps) throw 'No props were provided.'

      this.props = { ...this.props, ...newProps }
    } catch (error) {
      this.throw(error)
    }

    return this
  }

  mock(mockedProps) {
    const scriptArgs = Object.entries(mockedProps).reduce((args, [name, value]) => {
      return [...args, `--${name}`, value]
    }, [])

    return this.prepare(scriptArgs)
  }

  execute() {
    if (this.finished) return

    try {
      this.dispatchEvent('execute', this)
    } catch (error) {
      this.throw(error)
    }

    return this
  }

  appendsData(data) {
    this.data = { ...this.data, ...data }
  }

  throw(message) {
    this.reset()
    this.update(`${C`#d50000`}✕ ${message}`)

    this.finish()
  }

  finish() {
    this.finished = true
  }
}
