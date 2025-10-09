import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { hasInlineHeaders, isJSON, isStringLike, isURL } from '../validators'
import { requestHelpSections, requestHelpSectionTitles } from './request.constants'
import requestHandler from './request.handler'

export default new CommandBase({
  name: commandNames.REQUEST,
  helpSectionTitles: requestHelpSectionTitles,
  handler: requestHandler
})
  .expect({
    name: 'fetch',
    type: 'boolean',
    abbreviation: 'f',
    helpSection: requestHelpSections.API_CALL,
    worksWith: ['headers', 'payload', 'method', 'url', 'read-as'],
    mustHave: ['url'],
    description: 'Start an API request'
  })
  .expect({
    name: 'headers',
    type: 'string-array',
    abbreviation: 'H',
    helpSection: requestHelpSections.OPTIONS,
    validate: [hasInlineHeaders],
    description: 'Include request headers'
  })
  .expect({
    name: 'payload',
    type: 'string',
    abbreviation: 'p',
    helpSection: requestHelpSections.OPTIONS,
    description: 'Add a payload to the request',
    validate: [isJSON]
  })
  .expect({
    name: 'method',
    type: 'string',
    abbreviation: 'm',
    helpSection: requestHelpSections.OPTIONS,
    description: 'HTTP method to use',
    defaultValue: 'GET'
  })
  .expect({
    name: 'url',
    type: 'string',
    abbreviation: 'u',
    helpSection: requestHelpSections.API_CALL,
    description: 'URL for the API request',
    validate: [isURL]
  })
  .expect({
    name: 'read-as',
    type: 'string',
    abbreviation: 'r',
    helpSection: requestHelpSections.OPTIONS,
    description: 'Format to read the response: blob, text, or json',
    validate: [isStringLike(['blob', 'text', 'json'])],
    defaultValue: 'json'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: requestHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
