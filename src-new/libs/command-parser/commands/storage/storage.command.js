import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createSTORAGE = script => {
  return new Command({
    name: commandNames.STORAGE,
    command: script
  })
    .expect({ name: 'local', type: 'boolean', abbreviation: 'l' })
    .expect({ name: 'session', type: 'boolean', abbreviation: 's' })
    .expect({ name: 'cookie', type: 'boolean', abbreviation: 'c' })
}
