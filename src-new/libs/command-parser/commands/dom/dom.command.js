import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createDOM = script => {
  return new Command({
    name: commandNames.DOM,
    command: script
  })
    .expect({ name: 'get', type: 'boolean', abbreviation: 'g' })
    .expect({ name: 'tag', type: 'string', abbreviation: 't' })
    .expect({ name: 'attr', type: 'string', abbreviation: 'a' })
    .expect({ name: 'attr-val', type: 'string', abbreviation: 'A' })
}
