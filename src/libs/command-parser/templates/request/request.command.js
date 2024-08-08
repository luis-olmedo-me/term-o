import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { hasinlineHeaders, isJSON, isStringLike, isURL } from '../validators'

export default new CommandTemplate({ name: commandNames.REQUEST })
  .expect({
    name: 'fetch',
    type: 'boolean',
    abbreviation: 'f',
    worksWith: ['headers', 'payload', 'method', 'url', 'read-as'],
    mustHave: ['url'],
    description: 'Start an API call.'
  })
  .expect({
    name: 'headers',
    type: 'string-array',
    abbreviation: 'H',
    validate: [hasinlineHeaders],
    description: 'Add as much headers are needed.'
  })
  .expect({
    name: 'payload',
    type: 'string',
    abbreviation: 'p',
    description: 'Add payload to API request.',
    validate: [isJSON]
  })
  .expect({
    name: 'method',
    type: 'string',
    abbreviation: 'm',
    description: 'Select the method for request.',
    defaultValue: 'GET'
  })
  .expect({
    name: 'url',
    type: 'string',
    abbreviation: 'u',
    description: 'API URL where request will be made.',
    validate: [isURL]
  })
  .expect({
    name: 'read-as',
    type: 'string',
    abbreviation: 'r',
    description: 'API URL where request will be made.',
    validate: [isStringLike(['blob', 'text', 'json'])],
    defaultValue: 'json'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
