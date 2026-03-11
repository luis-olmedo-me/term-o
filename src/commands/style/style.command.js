import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import {
  hasAllItemsAs,
  hasItemAs,
  hasLength,
  hasLengthBetween,
  isArray,
  isRegExp,
  isSpaceForbidden,
  isString,
  isXpath
} from '@src/helpers/validation-command.helpers'
import { styleHelpSections } from './style.constants'
import { styleHandler } from './style.handler'

export default new CommandBase({
  name: commandNames.STYLE,
  handler: styleHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: styleHelpSections.RETRIEVAL,
    description: 'List CSS styles applied to elements matching the criteria',
    worksWith: ['on', 'property'],
    mustHave: ['on']
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: styleHelpSections.MODIFICATION,
    description: 'Apply styles to elements matching the criteria',
    validate: [
      hasAllItemsAs(isArray, hasLength(2), hasAllItemsAs(isString), hasItemAs(0, isSpaceForbidden))
    ],
    worksWith: ['on'],
    mustHave: ['on'],
    defaultValue: [],
    repeatable: true
  })
  .expect({
    name: 'color-pick',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: styleHelpSections.TOOLS,
    description: 'Pick a color by clicking on the web page',
    worksWith: [],
    mustHave: []
  })
  .expect({
    name: 'on',
    abbreviation: 'o',
    type: commandTypes.STRING,
    description: 'XPath expression to select elements',
    helpSection: styleHelpSections.RETRIEVAL,
    validate: [isXpath]
  })
  .expect({
    name: 'property',
    abbreviation: 'p',
    type: commandTypes.ARRAY,
    helpSection: styleHelpSections.FILTERS,
    description: 'Filter styles by property names (regex[])',
    validate: [hasAllItemsAs(isArray, hasLengthBetween(1, 2), hasAllItemsAs(isRegExp, isString))],
    repeatable: true
  })
