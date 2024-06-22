import { createUUIDv4 } from 'helpers/utils.helpers'

class Log {
  constructor(command) {
    this.id = createUUIDv4()
    this.command = command
  }
}

export { Log }
