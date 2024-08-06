import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'

export default new CommandTemplate({ name: commandNames.REQUEST })
  .expect({
    name: 'fetch',
    type: 'boolean',
    abbreviation: 'f',
    worksWith: ['headers', 'body', 'method'],
    description: 'Start an API call.'
  })
  .expect({
    name: 'headers',
    type: 'string-array',
    abbreviation: 'H',
    description: 'Add as much headers are needed.'
  })
  .expect({
    name: 'payload',
    type: 'string-array',
    abbreviation: 'p',
    description: 'Add payload to API request.'
  })
  .expect({
    name: 'method',
    type: 'string',
    abbreviation: 'b',
    description: 'Select the method for request.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
