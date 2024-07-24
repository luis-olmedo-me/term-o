import { createUUIDv4 } from '@src/helpers/utils.helpers'

import EventListener from '@src/libs/event-listener'
import Argument from '../argument'
import { executePerUpdates, getPropsFromString } from './command.helpers'

export class Command extends EventListener {
  constructor({ name, options, formatter }) {
    super()

    this.id = createUUIDv4()
    this.formatter = formatter
    this.name = name
    this.title = ''
    this.data = {}
    this.props = {}
    this.updates = []
    this.staticUpdates = []
    this.error = false
    this.finished = false
    this.executing = false
    this.nextCommand = null
    this.options = options
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

  setFormatter(newFormatter) {
    this.formatter = newFormatter

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
    const formattedMessage = this.formatter?.(`✕ ${message}`) || `✕ ${message}`

    this.reset()
    this.update(formattedMessage)

    this.finish()
    this.error = true
  }

  async executeNext() {
    const nextCommand = this.nextCommand

    if (!nextCommand) return

    const currentUpdates = this.updates
    const hasArgsHoldingUp = nextCommand.args.some(arg => arg.isHoldingUp)

    if (nextCommand.finished) {
      this.setUpdates(...currentUpdates, ...nextCommand.staticUpdates)

      return
    }

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
    this.finished = false
    this.executing = true
  }

  finish() {
    this.finished = true
    this.executing = false
    this.staticUpdates = [...this.staticUpdates, ...this.updates]
  }
}
