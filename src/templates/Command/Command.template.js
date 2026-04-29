import Argument from '@src/templates/Argument'
import EventListener from '@src/templates/EventListener'

import { commandStatuses } from '@src/constants/command.constants'

import { buildArgsFromProps } from '@src/helpers/arguments.helpers'
import { stringifyFragments, stringifyUpdates } from '@src/helpers/command.helpers'
import { formatError } from '@src/helpers/format.helpers'
import { getPropsFromString } from '@src/helpers/options.helpers'
import { cleanColors } from '@src/helpers/themes.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export class Command extends EventListener {
  constructor({ name, options }) {
    super()

    this.id = createUUIDv4()
    this.name = name
    this.props = {}
    this.updates = []
    this.staticUpdates = []
    this.status = commandStatuses.IDLE
    this.nextCommand = null
    this.options = options
    this.args = []
    this.canExecuteNext = true
    this.visible = true
    this._shared = {}
  }

  get hasArgsPending() {
    return this.args.some(arg => arg.isHoldingUp)
  }
  get finished() {
    return [commandStatuses.ERROR, commandStatuses.DONE].includes(this.status)
  }
  get failed() {
    return [commandStatuses.ERROR].includes(this.status)
  }
  get allCommands() {
    let tempCommand = this
    let commands = []

    while (tempCommand != null) {
      commands.push(tempCommand)
      tempCommand = tempCommand.nextCommand
    }

    return commands
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
    const scriptArgs = buildArgsFromProps(mockedProps)

    return this.prepare(scriptArgs)
  }

  async execute() {
    try {
      if (this.hasArgsPending) throw 'Params were not finished'

      this.props = this.options.getValues()

      this.reset()
      this.changeStatus(commandStatuses.EXECUTING)
      await this.dispatchEvent('execute', this)

      this.changeStatus(commandStatuses.DONE)
    } catch (error) {
      this.throw(error)
    }

    return this
  }

  async executePerLogs(previousCommand) {
    const argsHoldingUp = this.args.filter(arg => arg.isHoldingUp)

    for (const args of previousCommand.updates) {
      const update = stringifyFragments(args)
      const cleanedUpdate = cleanColors(update)

      argsHoldingUp.forEach(arg => {
        let newValue = arg.getValueFromArgs(cleanedUpdate, args)
        const isArray = Array.isArray(newValue)
        const isString = typeof newValue === 'string'

        if (isArray) newValue = newValue.map(cleanColors)
        if (isString) newValue = cleanColors(newValue)

        arg.setValue(newValue)
      })

      this.prepare()

      if (this.failed) break

      await this.execute()
      this.saveUpdates()

      if (this.failed) break
    }
  }

  throw(message) {
    if (message === null) message = ''
    else if (typeof message !== 'string') message = message.toString()
    const errorUpdate = formatError({ title: message })

    this.update(errorUpdate)
    this.changeStatus(commandStatuses.ERROR)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    if (this.nextCommand) this.nextCommand.share(this._shared)

    return this
  }
  get(key) {
    return this._shared[key] ?? null
  }

  changeStatus(newStatus) {
    this.status = newStatus
    this.dispatchEvent('statuschange', this)
  }

  hide() {
    this.visible = false
  }

  getCommandVisibleInChain() {
    const allCommands = this.allCommands
    const hasAnyHidden = allCommands.some(command => !command.visible)

    return this.failed || !hasAnyHidden
      ? allCommands.find(command => command.visible)
      : allCommands.reverse().find(command => command.visible)
  }

  jsonUI() {
    return {
      id: this.id,
      status: this.status,
      updates: stringifyUpdates(this.updates),
      context: this.get('context'),
      origin: this.get('origin'),
      title: this.get('title'),
      event: this.get('eventType')
    }
  }

  json() {
    return {
      id: this.id,
      status: this.status,
      updates: this.updates,
      context: this.get('context'),
      origin: this.get('origin'),
      title: this.get('title')
    }
  }
}
