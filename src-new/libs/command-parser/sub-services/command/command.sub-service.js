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
    this.timesExecuted = 0
    this.args = []
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
    this.args = args

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
    try {
      this.props = this.options.getValues()
      this.startExecuting()

      if (this.args.includes('$')) throw 'Command expects for value command before.'

      await this.dispatchEvent('execute', this)
      this.finish()
      await this.executeNext()
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
    const nextCommand = this.nextCommand
    const initialUpdates = [...currentUpdates, ...nextCommand.updates]
    const shouldExecute = nextCommand.timesExecuted === 0 && !nextCommand.finished

    if (!shouldExecute) return this.setUpdates(...initialUpdates)

    nextCommand.addEventListener('update', ({ updates }) => {
      this.setUpdates(...currentUpdates, ...updates)
    })

    for (let nextCommandUpdate of nextCommand.updates) {
      const updatedArgs = nextCommand.args.map(arg => (arg === '$' ? '"img"' : arg))

      nextCommand.prepare(updatedArgs)

      await nextCommand.execute()
    }
  }

  setTitle(newTitle) {
    this.title = newTitle

    return this
  }

  startExecuting() {
    this.finished = false
    this.executing = true
    this.timesExecuted++
  }

  finish() {
    this.finished = true
    this.executing = false
  }
}
