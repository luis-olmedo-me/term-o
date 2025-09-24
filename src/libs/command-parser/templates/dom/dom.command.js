import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import {
  hasAllItemsAs,
  hasLengthBetween,
  isInteger,
  isPositive,
  isRegExp,
  isTabId,
  isXpath
} from '../validators'
import { domHelpSectionTitles, domHelpSections } from './dom.constants'

export default new CommandTemplate({
  name: commandNames.DOM,
  helpSectionTitles: domHelpSectionTitles
})
  .expect({
    name: 'search-xpath',
    type: 'string',
    abbreviation: 'X',
    worksWith: ['click', 'tab-id', 'sibling', 'parent', 'child', 'xpath', 'below'],
    helpSection: domHelpSections.SEARCH,
    description: 'Find elements with an XPath query',
    validate: [isXpath]
  })
  .expect({
    name: 'click',
    type: 'boolean',
    abbreviation: 'c',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Click the selected element(s)'
  })
  .expect({
    name: 'sibling',
    type: 'number',
    abbreviation: 'b',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select sibling by index (positive = next, negative = previous)',
    validate: [isInteger]
  })
  .expect({
    name: 'parent',
    type: 'number',
    abbreviation: 'p',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select parent element by index (positive only)',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'child',
    type: 'number',
    abbreviation: 'd',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select child element by index (positive only)',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'search',
    type: 'boolean',
    abbreviation: 's',
    worksWith: ['attr', 'style', 'tag', 'group', 'text', 'content', 'xpath', 'tab-id', 'below'],
    helpSection: domHelpSections.SEARCH,
    description: 'Find elements by criteria'
  })
  .expect({
    name: 'xpath',
    type: 'boolean',
    abbreviation: 'x',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show XPath(s) of matched element(s)'
  })
  .expect({
    name: 'group',
    type: 'boolean',
    abbreviation: 'g',
    helpSection: domHelpSections.FILTERS,
    description: 'Count elements by attributes and tag names'
  })
  .expect({
    name: 'attr',
    type: 'string-array',
    abbreviation: 'a',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by attributes (regex supported in items)',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
  .expect({
    name: 'style',
    type: 'string-array',
    abbreviation: 'S',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by CSS styles (regex supported in items)',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
  .expect({
    name: 'tag',
    type: 'string',
    abbreviation: 't',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by tag name (regex supported)',
    validate: [isRegExp]
  })
  .expect({
    name: 'text',
    type: 'string',
    abbreviation: 'T',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by text content (regex supported)',
    validate: [isRegExp]
  })
  .expect({
    name: 'content',
    type: 'boolean',
    abbreviation: 'C',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show textual content of matched element(s)'
  })
  .expect({
    name: 'tab-id',
    type: 'string',
    abbreviation: 'i',
    validate: [isTabId],
    helpSection: domHelpSections.SEARCH,
    description: 'Search elements in a specific tab (T[number])'
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
    type: 'boolean',
    abbreviation: 'h',
    helpSection: domHelpSections.GENERAL,
    description: 'Show this help message',
    worksWith: []
  })
