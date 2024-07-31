import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { isDate, isInteger, isPositive, isRegExp } from '../validators'

export default new CommandTemplate({ name: commandNames.HISTORY })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: ['title', 'url', 'max-results', 'from'],
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
    name: 'from',
    type: 'string',
    abbreviation: 'f',
    description: 'Filter pages by date-from using a Date value.',
    validate: [isDate]
  })
  .expect({
    name: 'max-results',
    type: 'number',
    abbreviation: 'r',
    description: 'Specify a certain value of items to be displayed. Defaults to 100.',
    validate: [isPositive, isInteger],
    defaultValue: 100
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
