import EventListener from '../event-listener'

import { createUUIDv4 } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'
import { defaultValues } from './command.constants'
import { getPropsFromString, validateRequirements } from './command.helpers'

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
    this.dependencies = []
    this.hidden = hidden
    this.finished = false
    this.executing = false
  }

  get working() {
    return this.executing || this.finished
  }

  reset() {
    this.updates = []

    this.dispatchEvent('update', this)
  }

  update(...updates) {
    this.updates = [...this.updates, ...updates]

    this.dispatchEvent('update', this)
  }

  expect({ name, type, defaultValue, abbreviation, validate, worksWith }) {
    const value = (defaultValue || defaultValues[type]) ?? defaultValues.none

    this.defaults = { ...this.defaults, [name]: value }
    this.propTypes = { ...this.propTypes, [name]: type }
    if (abbreviation) this.abbreviations = { ...this.abbreviations, [abbreviation]: name }
    if (validate) this.validations = { ...this.validations, [name]: validate }
    if (worksWith) this.dependencies = { ...this.dependencies, [name]: worksWith }

    return this
  }

  prepare(args) {
    this.props = this.defaults

    try {
      const newProps = getPropsFromString(this, args)
      const hasNewProps = Object.values(newProps).length > 0
      const itExpectProps = Object.keys(this.propTypes).length > 0

      if (!hasNewProps && itExpectProps) throw 'No props were provided.'
      validateRequirements(this.dependencies, newProps)

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

  async execute() {
    if (this.working) throw 'Command can be executed once.'

    try {
      await this.dispatchEvent('execute', this)
      this.executing = true
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
    this.update(`${C`red`}✕ ${message}`)

    this.finish()
  }

  finish() {
    this.finished = true
    this.executing = false
  }
}
