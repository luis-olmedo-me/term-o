import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import {
  hasAllItemsAs,
  hasLengthBetween,
  isArray,
  isInteger,
  isPositive,
  isRegExp,
  isSnakeCase,
  isString,
  isTabId,
  isXpath
} from '@src/helpers/validation-command.helpers'
import { domHelpSections } from './dom.constants'
import { domHandler } from './dom.handler'

export default new CommandBase({
  name: commandNames.DOM,
  handler: domHandler
})
  .expect({
    name: 'search',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    description: 'Find elements by criteria',
    worksWith: ['attr', 'style', 'tag', 'text', 'content', 'xpath', 'tab-id', 'below'],
    helpSection: domHelpSections.SEARCH
  })
  .expect({
    name: 'on',
    abbreviation: 'o',
    type: commandTypes.STRING,
    helpSection: domHelpSections.SEARCH,
    description: 'Find elements with an XPath query',
    worksWith: ['tab-id', 'sibling', 'parent', 'child', 'xpath', 'below', 'inject'],
    validate: [isXpath]
  })
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Create a DOM element',
    worksWith: ['below'],
    validate: [isSnakeCase]
  })
  .expect({
    name: 'inject',
    abbreviation: 'I',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Inject HTML as text',
    validate: []
  })
  .expect({
    name: 'sibling',
    abbreviation: 'b',
    type: commandTypes.NUMBER,
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select sibling by index (integer)',
    validate: [isInteger]
  })
  .expect({
    name: 'parent',
    type: commandTypes.NUMBER,
    abbreviation: 'p',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select parent element by index (positive)',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'child',
    abbreviation: 'd',
    type: commandTypes.NUMBER,
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select child element by index (positive)',
    validate: [isInteger, isPositive]
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show XPath(s) of matched element(s)'
  })
  .expect({
    name: 'attr',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by attributes (regex[])',
    validate: [hasAllItemsAs(isArray, hasLengthBetween(1, 2), hasAllItemsAs(isString, isRegExp))],
    defaultValue: [],
    repeatable: true
  })
  .expect({
    name: 'style',
    abbreviation: 'S',
    type: commandTypes.ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by CSS styles (regex[])',
    validate: [hasAllItemsAs(isArray, hasLengthBetween(1, 2), hasAllItemsAs(isString, isRegExp))],
    defaultValue: [],
    repeatable: true
  })
  .expect({
    name: 'tag',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by tag name (regex)',
    validate: [isRegExp]
  })
  .expect({
    name: 'text',
    abbreviation: 'T',
    type: commandTypes.STRING,
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
    type: commandTypes.STRING,
    helpSection: domHelpSections.SEARCH,
    description: 'Search elements in a specific tab (T[number])',
    validate: [isTabId]
  })
  .expect({
    name: 'below',
    type: commandTypes.STRING,
    abbreviation: 'B',
    validate: [isXpath],
    helpSection: domHelpSections.SEARCH,
    description: 'Limit search scope under a specific element'
  })
