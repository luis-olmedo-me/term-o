import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createCLEAR = () => {
  return new Command({ name: commandNames.CLEAR })
}
