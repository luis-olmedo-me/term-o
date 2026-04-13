import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { historyHelpSections } from './history.constants'
import { historyHandler } from './history.handler'

export default new CommandBase({
  name: commandNames.HISTORY,
  handler: historyHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: historyHelpSections.GENERAL,
    description: 'Show a list of previously opened pages',
    validate: [options.allow('title', 'url', 'max-results', 'from', 'to')]
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: historyHelpSections.MANAGEMENT,
    description: 'Delete pages in a specific date range',
    validate: [options.requireAll('from', 'to')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: historyHelpSections.FILTERS,
    description: 'Filter pages by title (regex)',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: commandTypes.STRING,
    helpSection: historyHelpSections.FILTERS,
    description: 'Filter pages by URL (regex)',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'max-results',
    abbreviation: 'r',
    type: commandTypes.NUMBER,
    helpSection: historyHelpSections.FILTERS,
    description: 'Limit the number of items displayed',
    validate: [value.isPositive, value.isInteger, options.requireAnyOf('list')]
  })
  .expect({
    name: 'from',
    abbreviation: 'F',
    type: commandTypes.STRING,
    helpSection: historyHelpSections.FILTERS,
    description: 'Start date for deletion or filtering',
    validate: [value.isDate, options.requireAnyOf('list', 'delete')]
  })
  .expect({
    name: 'to',
    abbreviation: 'T',
    type: commandTypes.STRING,
    helpSection: historyHelpSections.FILTERS,
    description: 'End date for deletion or filtering',
    validate: [value.isDate, options.requireAnyOf('list', 'delete')]
  })
