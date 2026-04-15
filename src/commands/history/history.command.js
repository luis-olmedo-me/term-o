import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { historyHandler } from './history.handler'

export default new CommandBase({
  name: commandNames.HISTORY,
  handler: historyHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Show a list of previously opened pages',
    validate: [options.allow('title', 'url', 'max-results', 'from', 'to')]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Delete pages in a specific date range',
    validate: [options.requireAll('from', 'to')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the title',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a valid URL',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'max-results',
    abbreviation: 'r',
    type: commandTypes.NUMBER,
    helpSection: helpSections.DETAILS,
    description: 'Define the limit of items displayed',
    validate: [value.isPositive, value.isInteger, options.requireAnyOf('list')]
  })
  .expect({
    name: 'from',
    abbreviation: 'F',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the start date',
    validate: [value.isDate, options.requireAnyOf('list', 'delete')]
  })
  .expect({
    name: 'to',
    abbreviation: 'T',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the end date',
    validate: [value.isDate, options.requireAnyOf('list', 'delete')]
  })
