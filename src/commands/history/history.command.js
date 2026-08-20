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
    validate: [options.mustHave('from', 'to')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify a title filter',
    validate: [value.isRegExp, options.requireOneOf('list')]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify a valid URL',
    validate: [value.isRegExp, options.requireOneOf('list')]
  })
  .expect({
    name: 'max-results',
    abbreviation: 'r',
    type: commandTypes.NUMBER,
    helpSection: helpSections.DETAILS,
    description: 'Specify the maximum number of items to display',
    validate: [value.isPositive, value.isInteger, options.requireOneOf('list')]
  })
  .expect({
    name: 'from',
    abbreviation: 'F',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the start date',
    validate: [value.isDate, options.requireOneOf('list', 'delete')]
  })
  .expect({
    name: 'to',
    abbreviation: 'T',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the end date',
    validate: [value.isDate, options.requireOneOf('list', 'delete')]
  })
