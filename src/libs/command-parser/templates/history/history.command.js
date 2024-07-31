import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { isRegExp } from '../validators'

export default new CommandTemplate({ name: commandNames.HISTORY })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: ['title', 'url'],
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
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
