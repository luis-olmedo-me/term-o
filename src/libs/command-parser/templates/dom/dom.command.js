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
import { domHelpSections } from './dom.constants'

export default new CommandTemplate({ name: commandNames.DOM })
  .expect({
    name: 'search-xpath',
    type: 'string',
    abbreviation: 'X',
    worksWith: ['click', 'tab-id', 'sibling', 'parent', 'child', 'xpath', 'below'],
    helpSection: domHelpSections.SEARCH,
    description: 'Search for elements using XPath expression.',
    validate: [isXpath]
  })
  .expect({
    name: 'click',
    type: 'boolean',
    abbreviation: 'c',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Simulate a click action on the selected element.'
  })
  .expect({
    name: 'sibling',
    type: 'number',
    abbreviation: 'b',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description:
      'Get sibling by index on the selected element. Positive indexes means next siblings, and negative indexes, previous siblings.',
    validate: [isInteger]
  })
  .expect({
    name: 'parent',
    type: 'number',
    abbreviation: 'p',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Get parent by index on the selected element. Must be positive index.',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'child',
    type: 'number',
    abbreviation: 'd',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Get child by index on the selected element. Must be positive index.',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'search',
    type: 'boolean',
    abbreviation: 's',
    worksWith: ['attr', 'style', 'tag', 'group', 'text', 'content', 'xpath', 'tab-id', 'below'],
    helpSection: domHelpSections.SEARCHS,
    description: 'Search for elements based on various criteria.'
  })
  .expect({
    name: 'xpath',
    type: 'boolean',
    abbreviation: 'x',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Get the xpaths of the found elements.'
  })
  .expect({
    name: 'group',
    type: 'boolean',
    abbreviation: 'g',
    helpSection: domHelpSections.FILTERS,
    description: 'Group elements based on their attributes and tag names.'
  })
  .expect({
    name: 'attr',
    type: 'string-array',
    abbreviation: 'a',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter elements by attributes matching specified patterns.',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
  .expect({
    name: 'style',
    type: 'string-array',
    abbreviation: 'S',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter elements by CSS styles matching specified regular expressions.',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
  .expect({
    name: 'tag',
    type: 'string',
    abbreviation: 't',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter elements by tag name matching a regular expression.',
    validate: [isRegExp]
  })
  .expect({
    name: 'text',
    type: 'string',
    abbreviation: 'T',
    helpSection: domHelpSections.FILTERS,
    description: 'Filter elements by their textual content matching a regular expression.',
    validate: [isRegExp]
  })
  .expect({
    name: 'content',
    type: 'boolean',
    abbreviation: 'C',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Get the textual content of the found elements.'
  })
  .expect({
    name: 'tab-id',
    type: 'string',
    abbreviation: 'i',
    validate: [isTabId],
    helpSection: domHelpSections.SEARCH,
    description: 'Get elements on a specific tab ID (T[number]).'
  })
  .expect({
    name: 'below',
    type: 'string',
    abbreviation: 'B',
    validate: [isXpath],
    helpSection: domHelpSections.SEARCH,
    description: 'Specify under what element the search should be done using Xpath.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: domHelpSections.GENERAL,
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
