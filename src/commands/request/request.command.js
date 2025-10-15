import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import {
  hasInlineHeaders,
  isJSON,
  isStringLike,
  isURL
} from '@src/helpers/validation-command.helpers'
import { requestHelpSections, requestHelpSectionTitles } from './request.constants'
import { requestHandler } from './request.handler'

export default new CommandBase({
  name: commandNames.REQUEST,
  helpSectionTitles: requestHelpSectionTitles,
  handler: requestHandler
})
  .expect({
    name: 'fetch',
    abbreviation: 'f',
    type: commandTypes.BOOLEAN,
    helpSection: requestHelpSections.API_CALL,
    description: 'Start an API request',
    worksWith: ['headers', 'payload', 'method', 'url', 'read-as'],
    mustHave: ['url']
  })
  .expect({
    name: 'headers',
    abbreviation: 'H',
    type: commandTypes.STRING_ARRAY,
    helpSection: requestHelpSections.OPTIONS,
    description: 'Include request headers',
    validate: [hasInlineHeaders]
  })
  .expect({
    name: 'payload',
    abbreviation: 'p',
    type: 'string',
    helpSection: requestHelpSections.OPTIONS,
    description: 'Add a payload to the request',
    validate: [isJSON]
  })
  .expect({
    name: 'method',
    abbreviation: 'm',
    type: 'string',
    helpSection: requestHelpSections.OPTIONS,
    description: 'HTTP method to use',
    defaultValue: 'GET'
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: 'string',
    helpSection: requestHelpSections.API_CALL,
    description: 'URL for the API request',
    validate: [isURL]
  })
  .expect({
    name: 'read-as',
    abbreviation: 'r',
    type: 'string',
    helpSection: requestHelpSections.OPTIONS,
    description: 'Format to read the response: blob, text, or json',
    validate: [isStringLike(['blob', 'text', 'json'])],
    defaultValue: 'json'
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: requestHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
