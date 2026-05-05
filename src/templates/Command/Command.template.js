import Argument from '@src/templates/Argument'
import EventListener from '@src/templates/EventListener'

import { commandStatuses } from '@src/constants/command.constants'

import { buildArgsFromProps } from '@src/helpers/arguments.helpers'
import { renderLine } from '@src/helpers/command.helpers'
import { formatError } from '@src/helpers/format.helpers'
import { getPropsFromString } from '@src/helpers/options.helpers'
import { cleanColors } from '@src/helpers/themes.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export class Command extends EventListener {
  constructor({ name, options }) {
    super()

    this.id = createUUIDv4()
    this.name = name
    this.args = []
    this.props = {}
    this.status = commandStatuses.IDLE
    this.options = options
    this.visible = true
    this._staticLogs = []
    this._errorLogs = []
    this._logs = []
    this._shared = {}
  }

  get errors() {
    return this._errorLogs
  }
  get logs() {
    return [...this._staticLogs, ...this._logs, ...this._errorLogs]
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

  clearLogs() {
    this._logs = []

    this.dispatchEvent('update', this)
  }

  log(...newLogs) {
    this._logs = [...this._logs, ...newLogs]

    this.dispatchEvent('update', this)
  }

  saveLogs() {
    this._staticLogs = [...this._staticLogs, ...this._logs]
    this._logs = []
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

      this.clearLogs()
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

    for (const log of previousCommand.logs) {
      const line = renderLine(log)
      const cleanedLine = cleanColors(line)

      argsHoldingUp.forEach(arg => {
        let newValue = arg.getValueFromArgs(cleanedLine, log)
        const isArray = Array.isArray(newValue)
        const isString = typeof newValue === 'string'

        if (isArray) newValue = newValue.map(cleanColors)
        if (isString) newValue = cleanColors(newValue)

        arg.setValue(newValue)
      })

      this.prepare()

      if (this.failed) break

      await this.execute()
      this.saveLogs()

      if (this.failed) break
    }
  }

  throw(error) {
    let errorLogs = []

    if (error instanceof Array) errorLogs = error.map(String)
    else if (typeof error === 'string') errorLogs = [error]
    else if (error instanceof Error) errorLogs = [error.toString()]
    else errorLogs = ['Unexpected error was thrown.']

    const logs = errorLogs.map(log => formatError({ title: log }))

    this._errorLogs = [...this._errorLogs, ...logs]
    this.changeStatus(commandStatuses.ERROR)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

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
}
