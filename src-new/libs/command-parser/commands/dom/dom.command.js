import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createDOM = script => {
  return new Command({
    name: commandNames.DOM,
    command: script
  }).expect({ name: 'get', type: 'string' })
}
