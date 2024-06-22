import { createUUIDv4 } from '@src/helpers/utils.helpers'
import commandParser from '../CommandParser'

export class Log {
  constructor(command) {
    this.id = createUUIDv4()
    this.script = commandParser.read(command)
    this.command = command
  }
}
