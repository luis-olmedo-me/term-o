import EventListener from '@src/templates/EventListener'

import { outputBase } from '@src/commands'
import { throwParamsError } from '@src/helpers/command.helpers'
import { createUUIDv4, debounce } from '@src/helpers/utils.helpers'
import { getCommandListLogs, getCommandListStatus } from './CommandList.helpers'

export class CommandList extends EventListener {
  constructor({ metadata }) {
    super()

    this._id = createUUIDv4()
    this._nodes = []
    this._shared = metadata
    this._timerId = null
  }

  get status() {
    return getCommandListStatus(this._nodes)
  }

  get(key) {
    return this._shared[key] ?? null
  }

  add(newItem) {
    this._nodes = this._nodes.concat(newItem)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    return this
  }

  preloadParams(params) {
    const preCommand = outputBase.create().mock({ log: true, value: params })

    this._nodes = [preCommand, ...this._nodes]

    return this
  }

  async execute() {
    this._timerId = null
    const debouncedOnUpdate = debounce(this._onUpdate.bind(this), 50)
    const registerTimerId = () => (this._timerId = debouncedOnUpdate())

    for (let index = 0; index < this._nodes.length; index++) {
      const command = this._nodes[index]
      const previousCommand = this._nodes[index - 1]

      const hasArgsPending = command.hasArgsPending
      const hasPreviousCommand = Boolean(previousCommand)
      const hasPreviousParams = hasPreviousCommand && Boolean(previousCommand.logs.length)

      if (command.failed) break
      command.share(this._shared)
      command.addEventListener('update', registerTimerId)
      command.addEventListener('statuschange', registerTimerId)

      if (!hasPreviousCommand && hasArgsPending) throwParamsError(command)
      else if (!hasPreviousParams && hasArgsPending) throwParamsError(command)
      else if (hasArgsPending) await command.executePerLogs(previousCommand)
      else await command.execute()

      command.removeEventListener('update', registerTimerId)
      command.removeEventListener('statuschange', registerTimerId)
      if (command.failed) break
    }

    if (this._timerId === null) return
    clearTimeout(this._timerId)
    this._onUpdate()
  }

  hideUntil(id) {
    const indexCut = this._nodes.findIndex(node => node.id === id)

    if (indexCut === -1) return
    this._nodes.forEach((node, index) => {
      if (index <= indexCut) node.hide()
    })
  }

  toJSON(options = {}) {
    const { flat } = options

    return {
      id: this._id,
      status: this.status,
      logs: getCommandListLogs(this._nodes, { flat }),
      context: this.get('context'),
      origin: this.get('origin'),
      title: this.get('title'),
      event: this.get('event')
    }
  }

  _onUpdate() {
    this.dispatchEvent('update', this)
  }
}
