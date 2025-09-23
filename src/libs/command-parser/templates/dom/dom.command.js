import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import {
  isInRange,
  isInteger,
  isPositive,
  isRegExp,
  isTabId,
  isXpath,
  onAllItems
} from '../validators'

export default new CommandTemplate({ name: commandNames.DOM })
  .expect({
    name: 'search-xpath',
    type: 'string',
    abbreviation: 'X',
    worksWith: ['click', 'tab-id', 'sibling', 'parent', 'child', 'xpath', 'below'],
    description: 'Search for elements using XPath expression.',
    validate: [isXpath]
  })
  .expect({
    name: 'click',
    type: 'boolean',
    abbreviation: 'c',
    description: 'Simulate a click action on the selected element.'
  })
  .expect({
    name: 'sibling',
    type: 'number',
    abbreviation: 'b',
    description:
      'Get sibling by index on the selected element. Positive indexes means next siblings, and negative indexes, previous siblings.',
    validate: [isInteger]
  })
  .expect({
    name: 'parent',
    type: 'number',
    abbreviation: 'p',
    description: 'Get parent by index on the selected element. Must be positive index.',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'child',
    type: 'number',
    abbreviation: 'd',
    description: 'Get child by index on the selected element. Must be positive index.',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'search',
    type: 'boolean',
    abbreviation: 's',
    worksWith: ['attr', 'style', 'tag', 'group', 'text', 'content', 'xpath', 'tab-id', 'below'],
    description: 'Search for elements based on various criteria.'
  })
  .expect({
    name: 'xpath',
    type: 'boolean',
    abbreviation: 'x',
    description: 'Get the xpaths of the found elements.'
  })
  .expect({
    name: 'group',
    type: 'boolean',
    abbreviation: 'g',
    description: 'Group elements based on their attributes and tag names.'
  })
  .expect({
    name: 'attr',
    type: 'string-array',
    abbreviation: 'a',
    description: 'Filter elements by attributes matching specified patterns.',
    validate: [onAllItems(isRegExp), isInRange(0, 2)]
  })
  .expect({
    name: 'style',
    type: 'string-array',
    abbreviation: 'S',
    description: 'Filter elements by CSS styles matching specified regular expressions.',
    validate: [onAllItems(isRegExp), isInRange(0, 2)]
  })
  .expect({
    name: 'tag',
    type: 'string',
    abbreviation: 't',
    description: 'Filter elements by tag name matching a regular expression.',
    validate: [isRegExp]
  })
  .expect({
    name: 'text',
    type: 'string',
    abbreviation: 'T',
    description: 'Filter elements by their textual content matching a regular expression.',
    validate: [isRegExp]
  })
  .expect({
    name: 'content',
    type: 'boolean',
    abbreviation: 'C',
    description: 'Get the textual content of the found elements.'
  })
  .expect({
    name: 'tab-id',
    type: 'string',
    abbreviation: 'i',
    validate: [isTabId],
    description: 'Get elements on a specific tab ID (T[number]).'
  })
  .expect({
    name: 'below',
    type: 'string',
    abbreviation: 'B',
    validate: [isXpath],
    description: 'Specify under what element the search should be done using Xpath.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
