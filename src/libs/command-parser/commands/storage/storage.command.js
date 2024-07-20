import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'

export const createSTORAGE = () => {
  return new Command({ name: commandNames.STORAGE })
    .expect({
      name: 'local',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: ['json'],
      description: 'Get local storage from the pointed tab in the terminal.'
    })
    .expect({
      name: 'session',
      type: 'boolean',
      abbreviation: 's',
      worksWith: ['json'],
      description: 'Get local session from the pointed tab in the terminal.'
    })
    .expect({
      name: 'cookie',
      type: 'boolean',
      abbreviation: 'c',
      worksWith: ['json'],
      description: 'Get cookies from the pointed tab in the terminal.'
    })
    .expect({
      name: 'json',
      type: 'boolean',
      abbreviation: 'j',
      description: 'Get storages selected as JSON.'
    })
    .expect({
      name: 'help',
      type: 'boolean',
      abbreviation: 'h',
      worksWith: [],
      description: 'Display help about the options available for this command.'
    })
}
