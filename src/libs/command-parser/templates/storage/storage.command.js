import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { hasItems, isTabId } from '../validators'

export default new CommandTemplate({ name: commandNames.STORAGE })
  .expect({
    name: 'local',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: ['json', 'tab-id', 'set'],
    description: 'Get local storage from the pointed tab in the terminal.'
  })
  .expect({
    name: 'session',
    type: 'boolean',
    abbreviation: 's',
    worksWith: ['json', 'tab-id', 'set'],
    description: 'Get local session from the pointed tab in the terminal.'
  })
  .expect({
    name: 'cookie',
    type: 'boolean',
    abbreviation: 'c',
    worksWith: ['json', 'tab-id', 'set'],
    description: 'Get cookies from the pointed tab in the terminal.'
  })
  .expect({
    name: 'json',
    type: 'boolean',
    abbreviation: 'j',
    description: 'Get storages selected as JSON.'
  })
  .expect({
    name: 'set',
    type: 'string-array',
    validate: [hasItems(2)],
    abbreviation: 'S',
    description: 'Set key and value in the storage selected.'
  })
  .expect({
    name: 'tab-id',
    type: 'string',
    abbreviation: 'i',
    validate: [isTabId],
    description: 'Get storage on a specific tab ID (T[number]).'
  })
  .expect({
    name: 'copy',
    type: 'string',
    abbreviation: 'C',
    worksWith: [],
    description: 'Copy to clipboard the given [string] value.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    worksWith: [],
    description: 'Display help about the options available for this command.'
  })
