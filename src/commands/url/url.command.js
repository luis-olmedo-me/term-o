import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { urlHandler } from './url.handler'

export default new CommandBase({
  name: commandNames.URL,
  handler: urlHandler
})
  .expect({
    name: 'get',
    abbreviation: 'g',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get property from current URL',
    validate: [
      options.allow('tab-id', 'host', 'pathname', 'search', 'as-params', 'href', 'hash'),
      options.requireAnyOf('host', 'pathname', 'search', 'as-params', 'href', 'hash')
    ]
  })
  .expect({
    name: 'set',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Set a property from current URL',
    validate: [
      options.allow('tab-id', 'host', 'pathname', 'search', 'as-params', 'href', 'value', 'param'),
      options.requireAnyOf('host', 'pathname', 'search', 'as-params', 'href'),
      options.when('host', [options.requireAll('value')]),
      options.when('pathname', [options.requireAll('value')]),
      options.when('search', [options.requireAll('value')]),
      options.when('href', [options.requireAll('value')]),
      options.when('as-params', [options.requireAll('param')])
    ]
  })
  .expect({
    name: 'host',
    abbreviation: 'o',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL host',
    validate: [options.requireAnyOf('get', 'set')]
  })
  .expect({
    name: 'pathname',
    abbreviation: 'p',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL pathname',
    validate: [options.requireAnyOf('get', 'set')]
  })
  .expect({
    name: 'hash',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL hash',
    validate: [options.requireAnyOf('get', 'set')]
  })
  .expect({
    name: 'search',
    abbreviation: 'S',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL search string',
    validate: [options.requireAnyOf('get', 'set')]
  })
  .expect({
    name: 'as-params',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL search/hash parameters',
    validate: [options.requireAnyOf('get', 'set'), options.requireAnyOf('hash', 'search')]
  })
  .expect({
    name: 'href',
    abbreviation: 'H',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the full current URL',
    validate: [options.requireAnyOf('get', 'set')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireAnyOf('get', 'set')]
  })
  .expect({
    name: 'value',
    abbreviation: 'v',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the value',
    validate: [options.requireAnyOf('set')]
  })
  .expect({
    name: 'param',
    abbreviation: 'r',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define the param',
    validate: [
      array.hasAllItemsAs(value.isArray, array.hasLength(2), array.hasAllItemsAs(value.isString)),
      options.requireAnyOf('set')
    ],
    repeatable: true
  })
