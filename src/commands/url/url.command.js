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
      options.allow('tab-id', 'host', 'pathname', 'search', 'hash', 'as-params', 'href'),
      options.requireAnyOf('host', 'pathname', 'search', 'hash', 'as-params', 'href')
    ]
  })
  .expect({
    name: 'set',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Set a property from current URL',
    validate: [
      options.allow(
        'tab-id',
        'host',
        'pathname',
        'search',
        'hash',
        'as-params',
        'href',
        'value',
        'param'
      ),
      options.requireAnyOf('host', 'pathname', 'href', 'search', 'hash'),
      options.when('host', [options.requireAll('value')]),
      options.when('pathname', [options.requireAll('value')]),
      options.when('href', [options.requireAll('value')]),
      options.when('search', [options.requireAnyOf('value', 'param', 'as-params')]),
      options.when('hash', [
        options.requireAnyOf('value', 'param', 'as-params'),
        options.when('as-params', [options.requireAll('param')]),
        options.when('param', [options.requireAll('as-params')])
      ])
    ]
  })
  .expect({
    name: 'host',
    abbreviation: 'o',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL host',
    validate: [
      options.requireAnyOf('get', 'set'),
      options.conflict('pathname', 'search', 'hash', 'href')
    ]
  })
  .expect({
    name: 'pathname',
    abbreviation: 'p',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL pathname',
    validate: [
      options.requireAnyOf('get', 'set'),
      options.conflict('host', 'search', 'hash', 'href')
    ]
  })
  .expect({
    name: 'href',
    abbreviation: 'H',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the full current URL',
    validate: [
      options.requireAnyOf('get', 'set'),
      options.conflict('host', 'pathname', 'search', 'hash')
    ]
  })
  .expect({
    name: 'hash',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL hash',
    validate: [
      options.requireAnyOf('get', 'set'),
      options.conflict('host', 'pathname', 'search', 'href')
    ]
  })
  .expect({
    name: 'search',
    abbreviation: 'S',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL search string',
    validate: [
      options.requireAnyOf('get', 'set'),
      options.conflict('host', 'pathname', 'hash', 'href')
    ]
  })
  .expect({
    name: 'as-params',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Get the current URL search/hash parameters',
    validate: [options.requireAnyOf('get', 'set'), options.conflict('value')]
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
    validate: [options.requireAnyOf('get', 'set'), options.conflict('as-params')]
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
