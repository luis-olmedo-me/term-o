import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createSTORAGE = () => {
  return new Command({ name: commandNames.STORAGE })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: ['local', 'session', 'cookie'],
      description: 'Show a storages of the tab currently open.'
    })
    .expect({
      name: 'local',
      type: 'boolean',
      abbreviation: 'L',
      description: 'Get local storage from the pointed tab in the terminal.'
    })
    .expect({
      name: 'session',
      type: 'boolean',
      abbreviation: 'S',
      description: 'Get local session from the pointed tab in the terminal.'
    })
    .expect({
      name: 'cookie',
      type: 'boolean',
      abbreviation: 'C',
      description: 'Get cookies from the pointed tab in the terminal.'
    })
    .expect({
      name: 'help',
      type: 'boolean',
      abbreviation: 'h',
      description: 'Display help about the options available for this command.',
      worksWith: []
    })
}
