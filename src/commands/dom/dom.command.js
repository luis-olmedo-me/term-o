import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { domHandler } from './dom.handler'

export default new CommandBase({
  name: commandNames.DOM,
  handler: domHandler
})
  .expect({
    name: 'search',
    abbreviation: 's',
    type: commandTypes.BOOLEAN,
    description: 'Search for elements by criteria',
    helpSection: helpSections.ACTIONS,
    validate: [
      options.allow(
        'attr',
        'below',
        'content',
        'see-content',
        'see-xpath',
        'style',
        'tab-id',
        'tag'
      )
    ]
  })
  .expect({
    name: 'find',
    abbreviation: 'f',
    type: commandTypes.BOOLEAN,
    description: 'Find one element by criteria',
    helpSection: helpSections.ACTIONS,
    validate: [
      options.allow(
        'below',
        'child',
        'parent',
        'see-content',
        'see-xpath',
        'sibling',
        'tab-id',
        'xpath'
      ),
      options.requireAll('xpath')
    ]
  })
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Create a DOM element',
    validate: [
      options.allow('attr', 'below', 'see-content', 'see-xpath', 'tab-id', 'tag'),
      options.requireAll('tag')
    ]
  })
  .expect({
    name: 'pick',
    abbreviation: 'P',
    type: commandTypes.BOOLEAN,
    description: 'Pick an element from the tab',
    helpSection: helpSections.ACTIONS,
    validate: [options.allow('see-content', 'tab-id', 'times', 'see-xpath')]
  })
  .expect({
    name: 'measure',
    abbreviation: 'M',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Calculate the distance between two elements.',
    validate: [options.allow('from', 'tab-id', 'to')]
  })
  .expect({
    name: 'inject',
    abbreviation: 'I',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Inject HTML as within an element',
    validate: [
      options.allow('html', 'see-content', 'see-xpath', 'tab-id', 'xpath'),
      options.requireAll('html', 'xpath')
    ]
  })
  .expect({
    name: 'sibling',
    abbreviation: 'b',
    type: commandTypes.NUMBER,
    helpSection: helpSections.DETAILS,
    description: 'Define the sibling index',
    validate: [value.isInteger, options.requireAnyOf('find')]
  })
  .expect({
    name: 'parent',
    type: commandTypes.NUMBER,
    abbreviation: 'p',
    helpSection: helpSections.DETAILS,
    description: 'Define the parent index',
    validate: [value.isInteger, value.isPositive, options.requireAnyOf('find')]
  })
  .expect({
    name: 'child',
    abbreviation: 'd',
    type: commandTypes.NUMBER,
    helpSection: helpSections.DETAILS,
    description: 'Define the child index',
    validate: [value.isInteger, value.isPositive, options.requireAnyOf('find')]
  })
  .expect({
    name: 'attr',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define a name-value attribute pair',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLengthBetween(1, 2),
        array.hasAllItemsAs(value.isString)
      ),
      options.requireAnyOf('create', 'search')
    ]
  })
  .expect({
    name: 'style',
    abbreviation: 'S',
    type: commandTypes.ARRAY,
    helpSection: helpSections.DETAILS,
    description: 'Define a name-value style pair',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLengthBetween(1, 2),
        array.hasAllItemsAs(value.isString)
      ),
      options.requireAnyOf('search')
    ]
  })
  .expect({
    name: 'tag',
    abbreviation: 'g',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the element tag name',
    validate: [value.isKebabCase, options.requireAnyOf('create', 'search')]
  })
  .expect({
    name: 'content',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the text content',
    validate: [options.requireAnyOf('search')]
  })
  .expect({
    name: 'html',
    abbreviation: 'H',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the HTML content',
    validate: [options.requireAnyOf('inject')]
  })
  .expect({
    name: 'see-content',
    abbreviation: 'C',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether the text content should be displayed',
    validate: [options.requireAnyOf('create', 'inject', 'find', 'search', 'pick')]
  })
  .expect({
    name: 'see-xpath',
    abbreviation: 'X',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.DETAILS,
    description: 'Define whether XPath(s) should be displayed',
    validate: [options.requireAnyOf('create', 'inject', 'find', 'search', 'pick')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [
      value.isTabId,
      options.requireAnyOf('create', 'find', 'inject', 'measure', 'pick', 'search')
    ]
  })
  .expect({
    name: 'below',
    type: commandTypes.STRING,
    abbreviation: 'B',
    helpSection: helpSections.DETAILS,
    description: 'Define an Element XPath query where apply an action',
    validate: [options.requireAnyOf('create', 'find', 'search')]
  })
  .expect({
    name: 'xpath',
    type: commandTypes.STRING,
    abbreviation: 'x',
    helpSection: helpSections.DETAILS,
    description: 'Define an XPath query',
    validate: [options.requireAnyOf('find', 'inject')]
  })
  .expect({
    name: 'times',
    type: commandTypes.NUMBER,
    abbreviation: 'm',
    helpSection: helpSections.DETAILS,
    description: 'Define how many times the action must be done',
    defaultValue: 1,
    validate: [options.requireAnyOf('pick')]
  })
  .expect({
    name: 'from',
    type: commandTypes.STRING,
    abbreviation: 'F',
    helpSection: helpSections.DETAILS,
    description: 'Define the origin element XPath',
    validate: [options.requireAnyOf('measure')]
  })
  .expect({
    name: 'to',
    type: commandTypes.STRING,
    abbreviation: 'T',
    helpSection: helpSections.DETAILS,
    description: 'Define the destination element XPath',
    validate: [options.requireAnyOf('measure')]
  })
