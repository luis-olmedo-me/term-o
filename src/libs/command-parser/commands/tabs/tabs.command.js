import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isRegExp, isTabId, isURL } from '../validators'

export const createTABS = () => {
  return new Command({ name: commandNames.TABS })
    .expect({
      name: 'list',
      type: 'boolean',
      abbreviation: 'l',
      worksWith: ['incognito', 'muted', 'unmuted', 'title', 'url', 'window-id'],
      description: 'Show a list of tabs currently open.'
    })
    .expect({
      name: 'incognito',
      type: 'boolean',
      abbreviation: 'i',
      description: 'Filter tabs in incognito mode.'
    })
    .expect({
      name: 'title',
      type: 'string',
      abbreviation: 't',
      description: 'Filter tabs by title using a regular expression.',
      validate: [isRegExp]
    })
    .expect({
      name: 'url',
      type: 'string',
      abbreviation: 'u',
      description: 'Filter tabs by URL using a regular expression.',
      validate: [isRegExp]
    })
    .expect({
      name: 'muted',
      type: 'boolean',
      abbreviation: 'm',
      description: 'Filter muted tabs.'
    })
    .expect({
      name: 'unmuted',
      type: 'boolean',
      abbreviation: 'M',
      description: 'Filter unmuted tabs.'
    })
    .expect({
      name: 'window-id',
      type: 'string',
      abbreviation: 'w',
      validate: [isRegExp],
      description: 'Filter tabs by window ID.'
    })
    .expect({
      name: 'switch',
      type: 'string',
      abbreviation: 's',
      description: 'Switch to a specific tab by its ID (T[number]).',
      validate: [isTabId],
      worksWith: []
    })
    .expect({
      name: 'point',
      type: 'string',
      abbreviation: 'p',
      description: 'Focus terminal on a tab by its ID (T[number]).',
      validate: [isTabId],
      worksWith: []
    })
    .expect({
      name: 'reload',
      type: 'string',
      abbreviation: 'r',
      description: 'Reload a specific tab by its ID (T[number]).',
      validate: [isTabId],
      worksWith: []
    })
    .expect({
      name: 'close',
      type: 'string',
      abbreviation: 'c',
      description: 'Close a specific tab by its ID (T[number]).',
      validate: [isTabId],
      worksWith: []
    })
    .expect({
      name: 'open',
      type: 'string',
      abbreviation: 'o',
      description: 'Open a URL in a new tab.',
      validate: [isURL],
      worksWith: []
    })
    .expect({
      name: 'current',
      type: 'boolean',
      abbreviation: 'C',
      description: 'Show the current active tab.',
      worksWith: []
    })
    .expect({
      name: 'pointing',
      type: 'boolean',
      abbreviation: 'P',
      description: 'Show the tab currently pointed to by the terminal.',
      worksWith: []
    })
    .expect({
      name: 'help',
      type: 'boolean',
      abbreviation: 'h',
      description: 'Display help about the options available for this command.',
      worksWith: []
    })
}
