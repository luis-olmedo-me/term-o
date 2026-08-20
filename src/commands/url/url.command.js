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
    description: 'Show a property from the current URL',
    validate: [
      options.allow('tab-id', 'host', 'pathname', 'search', 'hash', 'as-params', 'href'),
      options.requireOneOf('host', 'pathname', 'search', 'hash', 'as-params', 'href')
    ]
  })
  .expect({
    name: 'set',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Set a property on the current URL',
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
      options.requireOneOf('host', 'pathname', 'href', 'search', 'hash'),
      options.when('host', [options.mustHave('value')]),
      options.when('pathname', [options.mustHave('value')]),
      options.when('href', [options.mustHave('value')]),
      options.when('search', [options.requireOneOf('value', 'param', 'as-params')]),
      options.when('hash', [
        options.requireOneOf('value', 'param', 'as-params'),
        options.when('as-params', [options.mustHave('param')]),
        options.when('param', [options.mustHave('as-params')])
      ])
    ]
  })
  .expect({
    name: 'host',
    abbreviation: 'o',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Show the current URL host',
    validate: [
      options.requireOneOf('get', 'set'),
      options.conflictWith('pathname', 'search', 'hash', 'href')
    ]
  })
  .expect({
    name: 'pathname',
    abbreviation: 'p',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Show the current URL pathname',
    validate: [
      options.requireOneOf('get', 'set'),
      options.conflictWith('host', 'search', 'hash', 'href')
    ]
  })
  .expect({
    name: 'href',
    abbreviation: 'H',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Show the full current URL',
    validate: [
      options.requireOneOf('get', 'set'),
      options.conflictWith('host', 'pathname', 'search', 'hash')
    ]
  })
  .expect({
    name: 'hash',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Show the current URL hash',
    validate: [
      options.requireOneOf('get', 'set'),
      options.conflictWith('host', 'pathname', 'search', 'href')
    ]
  })
  .expect({
    name: 'search',
    abbreviation: 'S',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Show the current URL search string',
    validate: [
      options.requireOneOf('get', 'set'),
      options.conflictWith('host', 'pathname', 'hash', 'href')
    ]
  })
  .expect({
    name: 'as-params',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Show the current URL search/hash parameters',
    validate: [options.requireOneOf('get', 'set'), options.conflictWith('value')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify a Tab ID to apply the action',
    validate: [value.isTabId, options.requireOneOf('get', 'set')]
  })
  .expect({
    name: 'value',
    abbreviation: 'v',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the value',
    validate: [options.requireOneOf('get', 'set'), options.conflictWith('as-params')]
  })
  .expect({
    name: 'param',
    abbreviation: 'r',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Specify a URL param pair',
    validate: [
      array.hasAllItemsAs(value.isArray, array.hasLength(2), array.hasAllItemsAs(value.isString)),
      options.requireOneOf('set')
    ],
    repeatable: true
  })
