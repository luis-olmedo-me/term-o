import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { isDate, isInteger, isPositive, isRegExp } from '../validators'

export default new CommandTemplate({ name: commandNames.HISTORY })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: ['title', 'url', 'max-results', 'from', 'to'],
    description: 'Show a list of pages open in the past.'
  })
  .expect({
    name: 'title',
    type: 'string',
    abbreviation: 't',
    description: 'Filter pages by title using a regular expression.',
    validate: [isRegExp]
  })
  .expect({
    name: 'url',
    type: 'string',
    abbreviation: 'u',
    description: 'Filter pages by URL using a regular expression.',
    validate: [isRegExp]
  })
  .expect({
    name: 'max-results',
    type: 'number',
    abbreviation: 'r',
    description: 'Specify a certain value of items to be displayed. Defaults to 100.',
    validate: [isPositive, isInteger],
    defaultValue: 0
  })
  .expect({
    name: 'delete',
    type: 'boolean',
    abbreviation: 'd',
    description: 'Delete a page by time range.',
    worksWith: ['from', 'to'],
    mustHave: ['from', 'to']
  })
  .expect({
    name: 'from',
    type: 'string',
    abbreviation: 'F',
    description: 'Filter pages by date-time-from using a date value.',
    validate: [isDate]
  })
  .expect({
    name: 'to',
    type: 'string',
    abbreviation: 'T',
    description: 'Filter pages by date-time-end using a date value.',
    validate: [isDate]
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
