import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { hasLength, isTabId } from '../validators'
import { storageHelpSections, storageHelpSectionTitles } from './storage.constants'

export default new CommandTemplate({
  name: commandNames.STORAGE,
  helpSectionTitles: storageHelpSectionTitles
})
  .expect({
    name: 'local',
    type: 'boolean',
    abbreviation: 'l',
    helpSection: storageHelpSections.RETRIEVAL,
    worksWith: ['json', 'tab-id', 'set'],
    description: 'Get local storage from the selected tab'
  })
  .expect({
    name: 'session',
    type: 'boolean',
    abbreviation: 's',
    helpSection: storageHelpSections.RETRIEVAL,
    worksWith: ['json', 'tab-id', 'set'],
    description: 'Get session storage from the selected tab'
  })
  .expect({
    name: 'cookie',
    type: 'boolean',
    abbreviation: 'c',
    helpSection: storageHelpSections.RETRIEVAL,
    worksWith: ['json', 'tab-id', 'set'],
    description: 'Get cookies from the selected tab'
  })
  .expect({
    name: 'json',
    type: 'boolean',
    abbreviation: 'j',
    helpSection: storageHelpSections.RETRIEVAL,
    description: 'Return storage as JSON'
  })
  .expect({
    name: 'set',
    type: 'string-array',
    validate: [hasLength(2)],
    abbreviation: 'S',
    helpSection: storageHelpSections.MODIFICATION,
    description: 'Set a key-value pair in the selected storage'
  })
  .expect({
    name: 'tab-id',
    type: 'string',
    abbreviation: 'i',
    helpSection: storageHelpSections.RETRIEVAL,
    validate: [isTabId],
    description: 'Specify a tab ID (T[number]) to get storage from'
  })
  .expect({
    name: 'copy',
    type: 'string',
    abbreviation: 'C',
    helpSection: storageHelpSections.MODIFICATION,
    worksWith: [],
    description: 'Copy a value to the clipboard'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: storageHelpSections.GENERAL,
    worksWith: [],
    description: 'Show help for this command'
  })
