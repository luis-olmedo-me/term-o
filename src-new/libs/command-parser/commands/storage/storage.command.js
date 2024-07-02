import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createSTORAGE = () => {
  return new Command({ name: commandNames.STORAGE })
    .expect({
      name: 'local',
      type: 'boolean',
      abbreviation: 'l'
    })
    .expect({
      name: 'session',
      type: 'boolean',
      abbreviation: 's'
    })
    .expect({
      name: 'cookie',
      type: 'boolean',
      abbreviation: 'c'
    })
}
