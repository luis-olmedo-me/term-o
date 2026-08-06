import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { storageHandler } from './storage.handler'

export default new CommandBase({
  name: commandNames.STORAGE,
  handler: storageHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List all storage key-values',
    validate: [
      options.allow('local', 'session', 'cookie', 'see-json', 'tab-id', 'data'),
      options.requireOneOf('local', 'session', 'cookie')
    ]
  })
  .expect({
    name: 'set',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Set a key-value pair in the selected storage',
    validate: [
      options.allow('local', 'session', 'cookie', 'data', 'tab-id'),
      options.requireOneOf('local', 'session', 'cookie'),
      options.mustHave('data')
    ]
  })
  .expect({
    name: 'copy',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Copy a value to the clipboard',
    validate: [options.mustHave('input')]
  })
  .expect({
    name: 'get',
    abbreviation: 'g',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get storage data',
    validate: [
      options.allow('local', 'session', 'cookie', 'see-json', 'tab-id', 'key'),
      options.requireOneOf('local', 'session', 'cookie')
    ]
  })
  .expect({
    name: 'local',
    abbreviation: 'L',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the local storage should be displayed',
    validate: [
      options.requireOneOf('list', 'set', 'get'),
      options.conflictWith('session', 'cookie')
    ]
  })
  .expect({
    name: 'session',
    abbreviation: 'S',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the session storage should be displayed',
    validate: [options.requireOneOf('list', 'set', 'get'), options.conflictWith('local', 'cookie')]
  })
  .expect({
    name: 'cookie',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the cookie storage should be displayed',
    validate: [options.requireOneOf('list', 'set', 'get'), options.conflictWith('local', 'session')]
  })
  .expect({
    name: 'see-json',
    abbreviation: 'j',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the JSON format should be displayed',
    validate: [options.requireOneOf('list')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireOneOf('list')]
  })
  .expect({
    name: 'input',
    abbreviation: 'I',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a user input',
    validate: [options.requireOneOf('copy')]
  })
  .expect({
    name: 'key',
    abbreviation: 'k',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a storage key',
    validate: [options.requireOneOf('get')]
  })
  .expect({
    name: 'data',
    abbreviation: 'D',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define a key-value pair',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(value.isArray, array.hasAllItemsAs(value.isString)),
      options.when('set', [array.hasAllItemsAs(array.hasLength(2))]),
      options.when('list', [array.hasAllItemsAs(array.hasLengthBetween(1, 2))]),
      options.requireOneOf('set', 'list')
    ]
  })
