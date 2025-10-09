import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { isRegExp, isTabId, isURL } from '../validators'
import { tabsHelpSections, tabsHelpSectionTitles } from './tabs.constants'
import tabsHandler from './tabs.handler'

export default new CommandBase({
  name: commandNames.TABS,
  helpSectionTitles: tabsHelpSectionTitles,
  handler: tabsHandler
})
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: ['incognito', 'muted', 'unmuted', 'title', 'url', 'window-id'],
    helpSection: tabsHelpSections.GENERAL,
    description: 'List all currently open tabs'
  })
  .expect({
    name: 'incognito',
    type: 'boolean',
    abbreviation: 'i',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Show only tabs in incognito mode'
  })
  .expect({
    name: 'title',
    type: 'string',
    abbreviation: 't',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Filter tabs by title (supports regular expressions)',
    validate: [isRegExp]
  })
  .expect({
    name: 'url',
    type: 'string',
    abbreviation: 'u',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Filter tabs by URL (supports regular expressions)',
    validate: [isRegExp]
  })
  .expect({
    name: 'muted',
    type: 'boolean',
    abbreviation: 'm',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Show only muted tabs'
  })
  .expect({
    name: 'unmuted',
    type: 'boolean',
    abbreviation: 'M',
    helpSection: tabsHelpSections.FILTERS,
    description: 'Show only unmuted tabs'
  })
  .expect({
    name: 'window-id',
    type: 'string',
    abbreviation: 'w',
    validate: [isRegExp],
    helpSection: tabsHelpSections.FILTERS,
    description: 'Filter tabs by window ID'
  })
  .expect({
    name: 'switch',
    type: 'string',
    abbreviation: 's',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Switch focus to a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: []
  })
  .expect({
    name: 'point',
    type: 'string',
    abbreviation: 'p',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Point the terminal to a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: []
  })
  .expect({
    name: 'reload',
    type: 'string',
    abbreviation: 'r',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Reload a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: ['wait']
  })
  .expect({
    name: 'close',
    type: 'string',
    abbreviation: 'c',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Close a specific tab by ID (T[number])',
    validate: [isTabId],
    worksWith: []
  })
  .expect({
    name: 'open',
    type: 'string',
    abbreviation: 'o',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Open a new tab with the given URL',
    validate: [isURL],
    worksWith: ['wait', 'active']
  })
  .expect({
    name: 'wait',
    type: 'boolean',
    abbreviation: 'W',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Wait until the tab finishes loading'
  })
  .expect({
    name: 'active',
    type: 'boolean',
    abbreviation: 'a',
    helpSection: tabsHelpSections.TAB_ACTIONS,
    description: 'Focus the tab open'
  })
  .expect({
    name: 'current',
    type: 'boolean',
    abbreviation: 'C',
    helpSection: tabsHelpSections.GENERAL,
    description: 'Show the currently active tab',
    worksWith: []
  })
  .expect({
    name: 'pointing',
    type: 'boolean',
    abbreviation: 'P',
    helpSection: tabsHelpSections.GENERAL,
    description: 'Show the tab currently targeted by the terminal',
    worksWith: []
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: tabsHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
