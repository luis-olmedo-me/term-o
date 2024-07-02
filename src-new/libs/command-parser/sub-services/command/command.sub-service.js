import EventListener from '../event-listener'

import { createUUIDv4 } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'
import { Options } from '../Options/Options.sub-service'
import { defaultValues } from './command.constants'
import { getPropsFromString } from './command.helpers'

export class Command extends EventListener {
  constructor({ name, hidden = false }) {
    super()

    this.id = createUUIDv4()
    this.name = name
    this.title = ''
    this.data = {}
    this.props = {}
    this.outputs = []
    this.updates = []
    this.hidden = hidden
    this.finished = false
    this.executing = false
    this.nextCommand = null
    this.options = new Options()
  }

  get canBeExecuted() {
    return !this.executing && !this.finished
  }

  reset() {
    this.updates = []

    this.dispatchEvent('update', this)
  }

  update(...updates) {
    this.updates = [...this.updates, ...updates]

    this.dispatchEvent('update', this)
  }

  setUpdates(...updates) {
    this.updates = updates

    this.dispatchEvent('update', this)
  }

  expect({ name, type, defaultValue, abbreviation, validate, worksWith }) {
    const value = (defaultValue || defaultValues[type]) ?? defaultValues.none

    this.options.add({
      name,
      value,
      type,
      abbreviation,
      validations: validate,
      dependencies: worksWith
    })

    return this
  }

  prepare(args) {
    try {
      const newProps = getPropsFromString(this, args)
      const hasNewProps = Object.values(newProps).length > 0
      const itExpectProps = this.options.length > 0

      if (!hasNewProps && itExpectProps) throw 'No props were provided.'

      this.options.setValues(newProps)
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
    if (!this.canBeExecuted) throw 'Command can be executed once.'

    try {
      this.props = this.options.getValues()
      this.executing = true

      await this.dispatchEvent('execute', this)
      await this.executeNext()

      this.finish()
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

  async executeNext() {
    if (!this.nextCommand) return
    const currentUpdates = this.updates

    this.nextCommand.addEventListener('update', ({ updates }) => {
      this.setUpdates(...currentUpdates, ...updates)
    })

    if (this.nextCommand.updates.length) {
      this.setUpdates(...currentUpdates, ...this.nextCommand.updates)
    }

    if (this.nextCommand.canBeExecuted) await this.nextCommand.execute()
  }

  setTitle(newTitle) {
    this.title = newTitle

    return this
  }

  finish() {
    this.finished = true
    this.executing = false
  }
}
