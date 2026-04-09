import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import {
  hasAllItemsAs,
  hasLength,
  hasLengthBetween,
  isArray,
  isInteger,
  isKebabCase,
  isPositive,
  isRegExp,
  isString,
  isTabId,
  mustHave,
  worksWith
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
    helpSection: domHelpSections.SEARCH,
    validate: [worksWith('attr', 'below', 'content', 'style', 'tab-id', 'tag', 'text', 'xpath')]
  })
  .expect({
    name: 'on',
    abbreviation: 'o',
    type: commandTypes.STRING,
    helpSection: domHelpSections.SEARCH,
    description: 'Find elements with an XPath query',
    validate: [worksWith('below', 'child', 'inject', 'parent', 'sibling', 'tab-id', 'xpath')]
  })
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Create a DOM element',
    validate: [isKebabCase, worksWith('attr', 'below')]
  })
  .expect({
    name: 'pick',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    description: 'Pick an element from the tab',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    validate: [worksWith('content', 'tab-id', 'times', 'xpath')]
  })
  .expect({
    name: 'measure',
    abbreviation: 'M',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Define two element xpaths and measure the distance between.',
    validate: [hasAllItemsAs(isString), hasLength(2), worksWith('tab-id')],
    repeatable: true
  })
  .expect({
    name: 'inject',
    abbreviation: 'I',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Inject HTML as text',
    validate: [
      worksWith('below', 'child', 'on', 'parent', 'sibling', 'tab-id', 'xpath'),
      mustHave('on')
    ]
  })
  .expect({
    name: 'sibling',
    abbreviation: 'b',
    type: commandTypes.NUMBER,
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select sibling by index (integer)',
    validate: [isInteger, worksWith('inject', 'on')]
  })
  .expect({
    name: 'parent',
    type: commandTypes.NUMBER,
    abbreviation: 'p',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select parent element by index (positive)',
    validate: [isInteger, isPositive, worksWith('inject', 'on')]
  })
  .expect({
    name: 'child',
    abbreviation: 'd',
    type: commandTypes.NUMBER,
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select child element by index (positive)',
    validate: [isInteger, isPositive, worksWith('inject', 'on')]
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show XPath(s) of matched element(s)',
    validate: [worksWith('on', 'pick', 'search', 'xpath')]
  })
  .expect({
    name: 'attr',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Describe DOM element attributes',
    validate: [
      hasAllItemsAs(isArray, hasLengthBetween(1, 2), hasAllItemsAs(isString, isRegExp)),
      worksWith('create', 'search')
    ],
    defaultValue: [],
    repeatable: true
  })
  .expect({
    name: 'style',
    abbreviation: 'S',
    type: commandTypes.ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by CSS styles (regex[])',
    validate: [
      hasAllItemsAs(isArray, hasLengthBetween(1, 2), hasAllItemsAs(isString, isRegExp)),
      worksWith('search')
    ],
    repeatable: true
  })
  .expect({
    name: 'tag',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by tag name (regex)',
    validate: [isRegExp, worksWith('search')]
  })
  .expect({
    name: 'text',
    abbreviation: 'T',
    type: commandTypes.STRING,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by text content (regex)',
    validate: [isRegExp, worksWith('search')]
  })
  .expect({
    name: 'content',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show textual content of matched element(s)',
    validate: [worksWith('search', 'pick')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: domHelpSections.SEARCH,
    description: 'Search elements in a specific tab (T[number])',
    validate: [isTabId, worksWith('create', 'inject', 'measure', 'on', 'search')]
  })
  .expect({
    name: 'below',
    type: commandTypes.STRING,
    abbreviation: 'B',
    helpSection: domHelpSections.SEARCH,
    description: 'Limit search scope under a specific element',
    validate: [worksWith('create', 'inject', 'on', 'search')]
  })
  .expect({
    name: 'times',
    type: commandTypes.NUMBER,
    abbreviation: 'm',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Specify how many times the task must be done',
    defaultValue: 1,
    validate: [worksWith('pick')]
  })
