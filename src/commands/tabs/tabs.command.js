import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { tabsHandler } from './tabs.handler'

export default new CommandBase({
  name: commandNames.TABS,
  handler: tabsHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List all currently open tabs',
    validate: [
      options.allow(
        'incognito',
        'muted',
        'unmuted',
        'title',
        'url',
        'window-id',
        'group-id',
        'tab-id'
      )
    ]
  })
  .expect({
    name: 'open',
    abbreviation: 'o',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Open a new tab with the given URL',
    validate: [options.allow('wait', 'active', 'url'), options.requireAll('url')]
  })
  .expect({
    name: 'reload',
    abbreviation: 'r',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Reload a specific tab by its identifier',
    validate: [options.allow('wait', 'tab-id'), options.requireAll('tab-id')]
  })
  .expect({
    name: 'switch',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Switch focus to a specific tab by its identifier',
    validate: [options.requireAll('tab-id')]
  })
  .expect({
    name: 'point',
    abbreviation: 'p',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Point the terminal to a specific tab by its identifier',
    validate: [options.requireAll('tab-id')]
  })
  .expect({
    name: 'close',
    abbreviation: 'c',
    type: commandTypes.STRING,
    helpSection: helpSections.ACTIONS,
    description: 'Close a specific tab by its identifier',
    validate: [options.requireAll('tab-id')]
  })
  .expect({
    name: 'current',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Show the currently active tab',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'pointing',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Show the tab currently targeted by the terminal',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'incognito',
    abbreviation: 'I',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether incognito tabs should be focused',
    validate: [options.requireAnyOf('list')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the title',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a valid URL',
    validate: [
      options.requireAnyOf('list', 'open'),
      options.when('open', [value.isURL]),
      options.when('list', [value.isRegExp])
    ]
  })
  .expect({
    name: 'muted',
    abbreviation: 'm',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether muted tabs should be focused',
    validate: [options.requireAnyOf('list'), options.conflict('unmuted')]
  })
  .expect({
    name: 'unmuted',
    abbreviation: 'M',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether unmuted tabs should be focused',
    validate: [options.requireAnyOf('list'), options.conflict('muted')]
  })
  .expect({
    name: 'wait',
    abbreviation: 'W',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the action must complete before continuing',
    validate: [options.requireAnyOf('open', 'reload')]
  })
  .expect({
    name: 'active',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether to use the current tab',
    validate: [options.requireAnyOf('open')]
  })
  .expect({
    name: 'window-id',
    abbreviation: 'w',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Window ID where apply an action',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'group-id',
    abbreviation: 'g',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Group ID where apply an action',
    validate: [value.isRegExp, options.requireAnyOf('list')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isRegExp, options.requireAnyOf('list', 'reload', 'switch', 'point', 'close')]
  })
