import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { responseFormatSupported } from '@src/constants/options.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { requestHelpSections } from './request.constants'
import { requestHandler } from './request.handler'

export default new CommandBase({
  name: commandNames.REQUEST,
  handler: requestHandler
})
  .expect({
    name: 'fetch',
    abbreviation: 'f',
    type: commandTypes.BOOLEAN,
    helpSection: requestHelpSections.API_CALL,
    description: 'Start an API request',
    validate: [
      options.allow('headers', 'method', 'payload', 'read-as', 'url'),
      options.requireAll('url')
    ]
  })
  .expect({
    name: 'headers',
    abbreviation: 'H',
    type: commandTypes.ARRAY,
    helpSection: requestHelpSections.OPTIONS,
    description: 'Include request headers',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLength(2),
        array.hasAllItemsAs(value.isString),
        array.hasItemAs(0, value.isSpaceForbidden)
      ),
      options.requireAnyOf('fetch')
    ]
  })
  .expect({
    name: 'payload',
    abbreviation: 'p',
    type: commandTypes.STRING,
    helpSection: requestHelpSections.OPTIONS,
    description: 'Add a payload to the request',
    validate: [value.isJSON, options.requireAnyOf('fetch')]
  })
  .expect({
    name: 'method',
    abbreviation: 'm',
    type: commandTypes.STRING,
    helpSection: requestHelpSections.OPTIONS,
    description: 'HTTP method to use',
    defaultValue: 'GET',
    validate: [options.requireAnyOf('fetch')]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: commandTypes.STRING,
    helpSection: requestHelpSections.API_CALL,
    description: 'URL for the API request',
    validate: [value.isURL, options.requireAnyOf('fetch')]
  })
  .expect({
    name: 'read-as',
    abbreviation: 'r',
    type: commandTypes.STRING,
    helpSection: requestHelpSections.OPTIONS,
    description: 'Format to read the response: blob, text, or json',
    validate: [value.isAnyOf(responseFormatSupported), options.requireAnyOf('fetch')],
    defaultValue: 'json'
  })
