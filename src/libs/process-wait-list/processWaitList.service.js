import { states } from './processWaitList.constants'

class ProcessWaitList {
  constructor() {
    this.list = []
  }

  getProcessById(id) {
    const process = this.list.find((process) => process.id === id)

    if (process?.state === 'done') this.remove(id)

    return process
  }

  resolver(id) {
    return (data) => {
      this.list = this.list.map((process) => {
        return process.id === id
          ? { ...process, state: states.DONE, data }
          : process
      })
    }
  }

  add(callback) {
    const newId = Date.now().toString()
    const newProcess = { id: newId, state: states.IN_PROGRESS, data: null }
    const resolve = this.resolver(newId).bind(this)

    this.list = [...this.list, newProcess]
    callback(resolve)

    return newProcess
  }

  remove(id) {
    this.list = this.list.filter((process) => process.id !== id)
  }
}

export const processWaitList = new ProcessWaitList()
