import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { hasLength, isTabId } from '@src/helpers/validation-command.helpers'
import { storageHelpSections, storageHelpSectionTitles } from './storage.constants'
import storageHandler from './storage.handler'

export default new CommandBase({
  name: commandNames.STORAGE,
  helpSectionTitles: storageHelpSectionTitles,
  handler: storageHandler
})
  .expect({
    name: 'local',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: storageHelpSections.RETRIEVAL,
    description: 'Get local storage from the selected tab',
    worksWith: ['json', 'tab-id', 'set']
  })
  .expect({
    name: 'session',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: storageHelpSections.RETRIEVAL,
    description: 'Get session storage from the selected tab',
    worksWith: ['json', 'tab-id', 'set']
  })
  .expect({
    name: 'cookie',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: storageHelpSections.RETRIEVAL,
    description: 'Get cookies from the selected tab',
    worksWith: ['json', 'tab-id', 'set']
  })
  .expect({
    name: 'json',
    abbreviation: 'j',
    type: commandTypes.BOOLEAN,
    helpSection: storageHelpSections.RETRIEVAL,
    description: 'Return storage as JSON'
  })
  .expect({
    name: 'set',
    abbreviation: 'S',
    type: commandTypes.STRING_ARRAY,
    helpSection: storageHelpSections.MODIFICATION,
    description: 'Set a key-value pair in the selected storage',
    validate: [hasLength(2)]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: 'string',
    helpSection: storageHelpSections.RETRIEVAL,
    description: 'Specify a tab ID (T[number]) to get storage from',
    validate: [isTabId]
  })
  .expect({
    name: 'copy',
    abbreviation: 'C',
    type: 'string',
    helpSection: storageHelpSections.MODIFICATION,
    description: 'Copy a value to the clipboard',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: storageHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
