import { formatError } from '@src/libs/command-parser/handlers/handlers.helpers'
import EventListener from '@src/libs/event-listener'
import { cleanColors } from '@src/libs/themer/themer.helpers'

import Argument from '@src/templates/Argument'

import { commandStatuses } from '@src/constants/command.constants'

import { getArgs, getArray } from '@src/helpers/arguments.helpers'
import { executePerUpdates } from '@src/helpers/command.helpers'
import { getPropsFromString } from '@src/helpers/options.helpers'
import { createUUIDv4, getQuotedString } from '@src/helpers/utils.helpers'

export class Command extends EventListener {
  constructor({ name, options, helpSectionTitles, executionContext }) {
    super()

    this.id = createUUIDv4()
    this.name = name
    this.executionContext = executionContext
    this.context = ''
    this.title = ''
    this.data = {}
    this.props = {}
    this.updates = []
    this.staticUpdates = []
    this.status = commandStatuses.IDLE
    this.helpSectionTitles = helpSectionTitles
    this.nextCommand = null
    this.options = options
    this.args = []
    this.canExecuteNext = true
    this.visible = true
  }

  get finished() {
    return [commandStatuses.ERROR, commandStatuses.DONE].includes(this.status)
  }
  get failed() {
    return [commandStatuses.ERROR].includes(this.status)
  }
  get cleanUpdates() {
    return this.updates.map(update => {
      const cleanedUpdate = cleanColors(update)
      const updateByArgs = getArgs(cleanedUpdate)

      if (this.failed) return cleanedUpdate

      return updateByArgs.map(arg => {
        const isArray = /^\[/g.test(arg) && /\]$/g.test(arg)
        const isString = /^"|^'/.test(arg) && /"$|'$/.test(arg)

        if (isArray) return getArray(arg)
        else if (isString) return arg.slice(1).slice(0, -1)
        else {
          const argAsNumber = Number(arg)
          return Number.isNaN(argAsNumber) ? null : argAsNumber
        }
      })
    })
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

        case 'string': {
          return [...args, `--${name}`, getQuotedString(value)]
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

        this.changeStatus(commandStatuses.DONE)
      } else {
        this.changeStatus(this.status)
      }
    } catch (error) {
      this.throw(error)
    }

    return this
  }

  applyData(data) {
    const newData = { ...this.data, ...data }

    this.allCommands.forEach(command => {
      command.data = newData
    })

    return this
  }

  throw(message) {
    const errorUpdate = formatError({ title: message })

    this.reset()
    this.update(errorUpdate)

    this.changeStatus(commandStatuses.ERROR)
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
    nextCommand.addEventListener('statuschange', command => {
      if (command.finished) this.changeStatus(nextCommand.status)
    })

    if (hasArgsHoldingUp) await executePerUpdates(nextCommand, staticUpdates)
    else await nextCommand.execute()
  }

  setTitle(newTitle) {
    this.title = newTitle

    return this
  }

  applyContext(newContext) {
    this.context = newContext

    if (this.nextCommand) this.nextCommand.applyContext(newContext)

    return this
  }

  startExecuting() {
    this.changeStatus(commandStatuses.EXECUTING)
    this.reset()
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

  simplify() {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      updates: this.updates,
      context: this.context,
      executionContext: this.executionContext
    }
  }
}
