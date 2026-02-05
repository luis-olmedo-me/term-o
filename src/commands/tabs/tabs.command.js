import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { isRegExp, isTabId, isURL } from '@src/helpers/validation-command.helpers'
import { tabsHelpSections, tabsHelpSectionTitles } from './tabs.constants'
import { tabsHandler } from './tabs.handler'

export default new CommandBase({
  name: commandNames.TABS,
  helpSectionTitles: tabsHelpSectionTitles,
  handler: tabsHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.GENERAL,
    description: 'List all currently open tabs',
    worksWith: ['incognito', 'muted', 'unmuted', 'title', 'url', 'window-id']
  })
  .expect({
    name: 'open',
    abbreviation: 'o',
    type: 'string',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Open a new tab with the given URL',
    worksWith: ['wait', 'active'],
    validate: [isURL]
  })
  .expect({
    name: 'reload',
    abbreviation: 'r',
    type: 'string',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Reload a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: ['wait']
  })
  .expect({
    name: 'incognito',
    abbreviation: 'i',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.FILTERS,
    description: 'Show only tabs in incognito mode'
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: 'string',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Filter tabs by title (regex)',
    validate: [isRegExp]
  })
  .expect({
    name: 'url',
    abbreviation: 'u',
    type: 'string',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Filter tabs by URL (regex)',
    validate: [isRegExp]
  })
  .expect({
    name: 'muted',
    abbreviation: 'm',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.FILTERS,
    description: 'Show only muted tabs'
  })
  .expect({
    name: 'unmuted',
    abbreviation: 'M',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.FILTERS,
    description: 'Show only unmuted tabs'
  })
  .expect({
    name: 'window-id',
    abbreviation: 'w',
    type: 'string',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Filter tabs by window ID (regex)',
    validate: [isRegExp]
  })
  .expect({
    name: 'switch',
    abbreviation: 's',
    type: 'string',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Switch focus to a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: []
  })
  .expect({
    name: 'point',
    abbreviation: 'p',
    type: 'string',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Point the terminal to a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: []
  })
  .expect({
    name: 'close',
    abbreviation: 'c',
    type: 'string',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Close a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: []
  })
  .expect({
    name: 'wait',
    abbreviation: 'W',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Wait until the tab finishes loading'
  })
  .expect({
    name: 'active',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Focus the tab open'
  })
  .expect({
    name: 'current',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.GENERAL,
    description: 'Show the currently active tab',
    worksWith: []
  })
  .expect({
    name: 'pointing',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.GENERAL,
    description: 'Show the tab currently targeted by the terminal',
    worksWith: []
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: tabsHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
