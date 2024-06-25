import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createCLEAR = (script, handler) => {
  return new Command({
    name: commandNames.CLEAR,
    command: script,
    hidden: true
  }).addEventListener('execute', handler)
}
