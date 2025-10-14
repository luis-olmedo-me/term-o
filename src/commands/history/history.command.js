import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { isDate, isInteger, isPositive, isRegExp } from '@src/helpers/validation-command.helpers'
import { historyHelpSections, historyHelpSectionTitles } from './history.constants'
import historyHandler from './history.handler'

export default new CommandBase({
  name: commandNames.HISTORY,
  helpSectionTitles: historyHelpSectionTitles,
  handler: historyHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: historyHelpSections.GENERAL,
    description: 'Show a list of previously opened pages',
    worksWith: ['title', 'url', 'max-results', 'from', 'to']
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: 'string',
    helpSection: historyHelpSections.FILTERS,
    description: 'Filter pages by title (supports regular expressions)',
    validate: [isRegExp]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: 'string',
    helpSection: historyHelpSections.FILTERS,
    description: 'Filter pages by URL (supports regular expressions)',
    validate: [isRegExp]
  })
  .expect({
    name: 'max-results',
    abbreviation: 'r',
    type: 'number',
    helpSection: historyHelpSections.FILTERS,
    description: 'Limit the number of items displayed',
    validate: [isPositive, isInteger],
    defaultValue: 0
  })
  .expect({
    name: 'delete',
    abbreviation: 'd',
    type: commandTypes.BOOLEAN,
    helpSection: historyHelpSections.MANAGEMENT,
    description: 'Delete pages in a specific date range',
    worksWith: ['from', 'to'],
    mustHave: ['from', 'to']
  })
  .expect({
    name: 'from',
    abbreviation: 'F',
    type: 'string',
    helpSection: historyHelpSections.FILTERS,
    description: 'Start date for deletion or filtering',
    validate: [isDate]
  })
  .expect({
    name: 'to',
    abbreviation: 'T',
    type: 'string',
    helpSection: historyHelpSections.FILTERS,
    description: 'End date for deletion or filtering',
    validate: [isDate]
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: historyHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
