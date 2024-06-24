import { commandNames } from '../../sub-services/command/command.constants'
import { Command } from '../../sub-services/command/command.service'

export const createClear = (script, handler) => {
  return new Command({
    name: commandNames.CLEAR,
    command: script,
    hidden: true
  }).setHandler(handler)
}
