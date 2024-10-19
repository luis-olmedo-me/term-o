import { createUUIDv4 } from '@src/helpers/utils.helpers'
import EventListener from '@src/libs/event-listener'

import { formatError } from '../../handlers/handlers.helpers'
import Argument from '../argument'
import { statuses } from './command.constants'
import { executePerUpdates, getPropsFromString } from './command.helpers'

export class Command extends EventListener {
  constructor({ name, options }) {
    super()

    this.id = createUUIDv4()
    this.name = name
    this.title = ''
    this.data = {}
    this.props = {}
    this.updates = []
    this.staticUpdates = []
    this.status = statuses.IDLE
    this.nextCommand = null
    this.options = options
    this.args = []
    this.canExecuteNext = true
  }

  get finished() {
    return [statuses.ERROR, statuses.DONE].includes(this.status)
  }
  get failed() {
    return [statuses.ERROR].includes(this.status)
  }

  reset() {
    this.updates = this.staticUpdates

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

  saveUpdates() {
    this.staticUpdates = this.updates
  }

  allowToExecuteNext(permission) {
    this.canExecuteNext = permission

    return this
  }

  prepare(args) {
    this.args = args ? args.map(arg => new Argument(arg)) : this.args

    try {
      const newProps = getPropsFromString(this)
      const hasNewProps = Object.values(newProps).length > 0
      const itExpectProps = this.options.length > 0
      const hasArgsHoldingUp = this.args.some(arg => arg.isHoldingUp)

      if (!hasNewProps && itExpectProps && !hasArgsHoldingUp) {
        const name = this.name

        throw `"${name}" command expects for props. Instead, it received nothing.`
      }

      if (!hasArgsHoldingUp) this.options.setValues(newProps)
    } catch (error) {
      this.throw(error)
    }

    return this
  }

  mock(mockedProps) {
    const scriptArgs = Object.entries(mockedProps).reduce((args, [name, value]) => {
      switch (typeof value) {
        case 'object': {
          const isArray = Array.isArray(value)
          const formattedValues = isArray ? value.map(item => `"${item}"`) : []

          return isArray ? [...args, `--${name}`, `[${formattedValues.join(' ')}]`] : args
        }

        case 'boolean': {
          return [...args, `--${name}`]
        }

        default: {
          return [...args, `--${name}`, value]
        }
      }
    }, [])

    return this.prepare(scriptArgs)
  }

  async execute() {
    try {
      this.props = this.options.getValues()
      this.startExecuting()

      await this.dispatchEvent('execute', this)

      if (!this.finished) {
        if (this.canExecuteNext) await this.executeNext()

        this.finish(statuses.DONE)
      }
    } catch (error) {
      this.throw(error)
    }

    return this
  }

  appendsData(data) {
    this.data = { ...this.data, ...data }
  }

  throw(message) {
    const errorUpdate = formatError({ title: `✕ ${message}` })

    this.reset()
    this.update(errorUpdate)

    this.finish(statuses.ERROR)
  }

  async executeNext() {
    const nextCommand = this.nextCommand

    if (!nextCommand) return

    const staticUpdates = [...this.updates]
    const hasArgsHoldingUp = nextCommand.args.some(arg => arg.isHoldingUp)

    if (nextCommand.finished) return this.update(...nextCommand.updates)

    this.saveUpdates()
    nextCommand.addEventListener('update', ({ updates }) => {
      this.setUpdates(...this.staticUpdates, ...updates)
    })

    nextCommand.appendsData(this.data)
    nextCommand.setTitle(this.title)

    if (hasArgsHoldingUp) await executePerUpdates(nextCommand, staticUpdates)
    else await nextCommand.execute()
  }

  setTitle(newTitle) {
    this.title = newTitle

    return this
  }

  startExecuting() {
    this.status = statuses.EXECUTING
    this.reset()
  }

  finish(newStatus) {
    this.status = newStatus
  }
}
