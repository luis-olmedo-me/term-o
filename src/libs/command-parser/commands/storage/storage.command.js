import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isTabId } from '../validators'

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
      name: 'tab-id',
      type: 'string',
      abbreviation: 'i',
      validate: [isTabId],
      description: 'Get storage on a specific tab ID (T[number]).'
    })
    .expect({
      name: 'help',
      type: 'boolean',
      abbreviation: 'h',
      worksWith: [],
      description: 'Display help about the options available for this command.'
    })
}
