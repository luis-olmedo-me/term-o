import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isXpath } from '../validators'

export const createSTYLE = () => {
  return new Command({ name: commandNames.STYLE }).expect({
    name: 'on',
    type: 'string',
    abbreviation: 'o',
    worksWith: [],
    validate: [isXpath]
  })
}
