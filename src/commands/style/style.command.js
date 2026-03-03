import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import {
  hasAllItemsAs,
  hasLengthBetween,
  isInlineStyles,
  isRegExp,
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
    type: commandTypes.STRING,
    helpSection: styleHelpSections.MODIFICATION,
    description: 'Apply inline styles to elements matching the criteria',
    validate: [isInlineStyles],
    worksWith: ['on'],
    mustHave: ['on']
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
    type: commandTypes.STRING_ARRAY,
    helpSection: styleHelpSections.FILTERS,
    description: 'Filter styles by property names (regex[])',
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)]
  })
