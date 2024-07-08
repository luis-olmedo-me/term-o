import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createSTYLE = () => {
  return new Command({ name: commandNames.STYLE }).expect({
    name: 'on',
    type: 'boolean',
    abbreviation: 'o'
  })
}
