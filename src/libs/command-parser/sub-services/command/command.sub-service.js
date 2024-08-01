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
  }

  get finished() {
    return [statuses.ERROR, statuses.DONE].includes(this.status)
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
      return [...args, `--${name}`, value]
    }, [])

    return this.prepare(scriptArgs)
  }

  async execute() {
    try {
      this.props = this.options.getValues()
      this.startExecuting()

      await this.dispatchEvent('execute', this)
      await this.executeNext()

      this.status = statuses.DONE
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
    const errorUpdate = formatError({ title: `✕ ${message}` })

    this.reset()
    this.update(errorUpdate)

    this.status = statuses.ERROR
    this.finish()
  }

  async executeNext() {
    const nextCommand = this.nextCommand

    if (!nextCommand || this.finished) return

    const currentUpdates = this.updates
    const hasArgsHoldingUp = nextCommand.args.some(arg => arg.isHoldingUp)

    if (nextCommand.finished) return this.update(...nextCommand.updates)

    nextCommand.addEventListener('update', ({ staticUpdates, updates }) => {
      this.setUpdates(...currentUpdates, ...staticUpdates, ...updates)
    })

    nextCommand.appendsData(this.data)
    nextCommand.setTitle(this.title)

    if (hasArgsHoldingUp) await executePerUpdates(nextCommand, currentUpdates)
    else await nextCommand.execute()
  }

  setTitle(newTitle) {
    this.title = newTitle

    return this
  }

  startExecuting() {
    this.status = statuses.EXECUTING
  }

  finish() {
    this.staticUpdates = [...this.staticUpdates, ...this.updates]
  }
}
