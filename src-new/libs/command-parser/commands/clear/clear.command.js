import { commandNames } from '../command.constants'
import { Command } from '../command.service'

export const createClear = (script, handler) => {
  return new Command({
    name: commandNames.CLEAR,
    command: script,
    hidden: true
  }).setHandler(handler)
}
