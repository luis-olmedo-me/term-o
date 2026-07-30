import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
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
    validate: [options.allow('tab-id', 'host', 'pathname', 'search', 'params', 'href')]
  })
  .expect({
    name: 'host',
    abbreviation: 'o',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get the current URL host',
    validate: [options.allow('get', 'tab-id'), options.requireAll('get')]
  })
  .expect({
    name: 'pathname',
    abbreviation: 'p',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get the current URL pathname',
    validate: [options.allow('get', 'tab-id'), options.requireAll('get')]
  })
  .expect({
    name: 'search',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get the current URL search string',
    validate: [options.allow('get', 'tab-id'), options.requireAll('get')]
  })
  .expect({
    name: 'params',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get the current URL search parameters',
    validate: [options.allow('get', 'tab-id'), options.requireAll('get')]
  })
  .expect({
    name: 'href',
    abbreviation: 'H',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Get the full current URL',
    validate: [options.allow('get', 'tab-id'), options.requireAll('get')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireAnyOf('host', 'href', 'pathname')]
  })
