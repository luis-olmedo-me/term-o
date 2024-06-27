import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createCLEAR = script => {
  return new Command({
    name: commandNames.CLEAR,
    command: script,
    hidden: true
  })
}
