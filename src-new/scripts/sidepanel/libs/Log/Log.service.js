import { createUUIDv4 } from 'helpers/utils.helpers'

export class Log {
  constructor(command) {
    this.id = createUUIDv4()
    this.command = command
  }
}
