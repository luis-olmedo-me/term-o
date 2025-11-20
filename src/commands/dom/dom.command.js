import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import {
  hasAllItemsAs,
  hasLengthBetween,
  isInteger,
  isPositive,
  isRegExp,
  isTabId,
  isXpath
} from '@src/helpers/validation-command.helpers'
import { domHelpSectionTitles, domHelpSections } from './dom.constants'
import { domHandler } from './dom.handler'

export default new CommandBase({
  name: commandNames.DOM,
  helpSectionTitles: domHelpSectionTitles,
  handler: domHandler
})
  .expect({
    name: 'search-xpath',
    abbreviation: 'X',
    type: 'string',
    helpSection: domHelpSections.SEARCH,
    description: 'Find elements with an XPath query',
    worksWith: ['click', 'tab-id', 'sibling', 'parent', 'child', 'xpath', 'below'],
    validate: [isXpath]
  })
  .expect({
    name: 'click',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Click the selected element(s)'
  })
  .expect({
    name: 'sibling',
    abbreviation: 'b',
    type: 'number',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select sibling by index (integer)',
    validate: [isInteger]
  })
  .expect({
    name: 'parent',
    type: 'number',
    abbreviation: 'p',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select parent element by index (positive)',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'child',
    abbreviation: 'd',
    type: 'number',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select child element by index (positive)',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'search',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    description: 'Find elements by criteria',
    worksWith: ['attr', 'style', 'tag', 'group', 'text', 'content', 'xpath', 'tab-id', 'below'],
    helpSection: domHelpSections.SEARCH
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show XPath(s) of matched element(s)'
  })
  .expect({
    name: 'group',
    abbreviation: 'g',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.FILTERS,
    description: 'Count elements by attributes and tag names'
  })
  .expect({
    name: 'attr',
    abbreviation: 'a',
    type: commandTypes.STRING_ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by attributes (regex[])',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
  .expect({
    name: 'style',
    abbreviation: 'S',
    type: commandTypes.STRING_ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by CSS styles (regex[])',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
  .expect({
    name: 'tag',
    abbreviation: 't',
    type: 'string',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by tag name (regex)',
    validate: [isRegExp]
  })
  .expect({
    name: 'text',
    abbreviation: 'T',
    type: 'string',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by text content (regex)',
    validate: [isRegExp]
  })
  .expect({
    name: 'content',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show textual content of matched element(s)'
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: 'string',
    helpSection: domHelpSections.SEARCH,
    description: 'Search elements in a specific tab (T[number])',
    validate: [isTabId]
  })
  .expect({
    name: 'below',
    type: 'string',
    abbreviation: 'B',
    validate: [isXpath],
    helpSection: domHelpSections.SEARCH,
    description: 'Limit search scope under a specific element'
  })
  .expect({
    name: 'help',
    type: commandTypes.BOOLEAN,
    abbreviation: 'h',
    helpSection: domHelpSections.GENERAL,
    description: 'Show this help message',
    worksWith: []
  })
