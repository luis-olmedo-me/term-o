import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
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
    validate: [options.allow('attr', 'below', 'content', 'style', 'tab-id', 'tag', 'text', 'xpath')]
  })
  .expect({
    name: 'on',
    abbreviation: 'o',
    type: commandTypes.STRING,
    helpSection: domHelpSections.SEARCH,
    description: 'Find elements with an XPath query',
    validate: [options.allow('below', 'child', 'inject', 'parent', 'sibling', 'tab-id', 'xpath')]
  })
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Create a DOM element',
    validate: [value.isKebabCase, options.allow('attr', 'below', 'tab-id')]
  })
  .expect({
    name: 'pick',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    description: 'Pick an element from the tab',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    validate: [options.allow('content', 'tab-id', 'times', 'xpath')]
  })
  .expect({
    name: 'measure',
    abbreviation: 'M',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Define two element xpaths and measure the distance between.',
    validate: [array.hasAllItemsAs(value.isString), array.hasLength(2), options.allow('tab-id')],
    repeatable: true
  })
  .expect({
    name: 'inject',
    abbreviation: 'I',
    type: commandTypes.STRING,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Inject HTML as text',
    validate: [
      options.allow('below', 'child', 'on', 'parent', 'sibling', 'tab-id', 'xpath'),
      options.requireAll('on')
    ]
  })
  .expect({
    name: 'sibling',
    abbreviation: 'b',
    type: commandTypes.NUMBER,
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select sibling by index (integer)',
    validate: [value.isInteger, options.requireAnyOf('inject', 'on')]
  })
  .expect({
    name: 'parent',
    type: commandTypes.NUMBER,
    abbreviation: 'p',
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select parent element by index (positive)',
    validate: [value.isInteger, value.isPositive, options.requireAnyOf('inject', 'on')]
  })
  .expect({
    name: 'child',
    abbreviation: 'd',
    type: commandTypes.NUMBER,
    helpSection: domHelpSections.DOM_NAVIGATION,
    description: 'Select child element by index (positive)',
    validate: [value.isInteger, value.isPositive, options.requireAnyOf('inject', 'on')]
  })
  .expect({
    name: 'xpath',
    abbreviation: 'x',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show XPath(s) of matched element(s)',
    validate: [options.requireAnyOf('on', 'pick', 'search', 'xpath')]
  })
  .expect({
    name: 'attr',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: domHelpSections.FILTERS,
    description: 'Describe DOM element attributes',
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLengthBetween(1, 2),
        array.hasAllItemsAs(value.isString, value.isRegExp)
      ),
      options.requireAnyOf('create', 'search')
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
      array.hasAllItemsAs(
        value.isArray,
        array.hasLengthBetween(1, 2),
        array.hasAllItemsAs(value.isString, value.isRegExp)
      ),
      options.requireAnyOf('search')
    ],
    repeatable: true
  })
  .expect({
    name: 'tag',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by tag name (regex)',
    validate: [value.isRegExp, options.requireAnyOf('search')]
  })
  .expect({
    name: 'text',
    abbreviation: 'T',
    type: commandTypes.STRING,
    helpSection: domHelpSections.FILTERS,
    description: 'Filter by text content (regex)',
    validate: [value.isRegExp, options.requireAnyOf('search')]
  })
  .expect({
    name: 'content',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Show textual content of matched element(s)',
    validate: [options.requireAnyOf('search', 'pick')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: domHelpSections.SEARCH,
    description: 'Search elements in a specific tab (T[number])',
    validate: [
      value.isTabId,
      options.requireAnyOf('create', 'inject', 'measure', 'on', 'pick', 'search')
    ]
  })
  .expect({
    name: 'below',
    type: commandTypes.STRING,
    abbreviation: 'B',
    helpSection: domHelpSections.SEARCH,
    description: 'Limit search scope under a specific element',
    validate: [options.requireAnyOf('create', 'inject', 'on', 'search')]
  })
  .expect({
    name: 'times',
    type: commandTypes.NUMBER,
    abbreviation: 'm',
    helpSection: domHelpSections.ACTIONS_AND_UTILITIES,
    description: 'Specify how many times the task must be done',
    defaultValue: 1,
    validate: [options.requireAnyOf('pick')]
  })
