import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { storageHandler } from './storage.handler'

export default new CommandBase({
  name: commandNames.STORAGE,
  handler: storageHandler
})
  .expect({
    name: 'local',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get local storage from the selected tab',
    validate: [options.allow('see-json', 'tab-id', 'set')]
  })
  .expect({
    name: 'session',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get session storage from the selected tab',
    validate: [options.allow('see-json', 'tab-id', 'set')]
  })
  .expect({
    name: 'cookie',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get cookies from the selected tab',
    validate: [options.allow('see-json', 'tab-id', 'set')]
  })
  .expect({
    name: 'set',
    abbreviation: 'S',
    type: commandTypes.ARRAY,
    helpSection: helpSections.ACTIONS,
    description: 'Set a key-value pair in the selected storage',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(value.isArray, array.hasLength(2), array.hasAllItemsAs(value.isString)),
      options.requireAnyOf('local', 'session', 'cookie')
    ]
  })
  .expect({
    name: 'copy',
    abbreviation: 'C',
    type: commandTypes.STRING,
    helpSection: helpSections.ACTIONS,
    description: 'Copy a value to the clipboard',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'see-json',
    abbreviation: 'j',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the JSON format should be displayed',
    validate: [options.requireAnyOf('local', 'session', 'cookie')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireAnyOf('local', 'session', 'cookie')]
  })
