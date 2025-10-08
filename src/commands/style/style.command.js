import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { hasAllItemsAs, hasLengthBetween, isInlineStyles, isRegExp, isXpath } from '../validators'
import { styleHelpSections, styleHelpSectionTitles } from './style.constants'

export default new CommandBase({
  name: commandNames.STYLE,
  helpSectionTitles: styleHelpSectionTitles
})
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    helpSection: styleHelpSections.RETRIEVAL,
    worksWith: ['on', 'property', 'selector'],
    mustHave: ['on'],
    description: 'List CSS styles applied to elements matching the criteria'
  })
  .expect({
    name: 'apply',
    type: 'string',
    abbreviation: 'a',
    helpSection: styleHelpSections.MODIFICATION,
    validate: [isInlineStyles],
    worksWith: ['on'],
    mustHave: ['on'],
    description: 'Apply inline styles to elements matching the criteria'
  })
  .expect({
    name: 'on',
    type: 'string',
    abbreviation: 'o',
    helpSection: styleHelpSections.RETRIEVAL,
    validate: [isXpath],
    description: 'XPath expression to select elements'
  })
  .expect({
    name: 'property',
    type: 'string-array',
    abbreviation: 'p',
    helpSection: styleHelpSections.FILTERS,
    validate: [hasAllItemsAs(isRegExp), hasLengthBetween(0, 2)],
    description: 'Filter styles by property names (supports regex)'
  })
  .expect({
    name: 'selector',
    type: 'string',
    abbreviation: 's',
    helpSection: styleHelpSections.FILTERS,
    validate: [hasAllItemsAs(isRegExp)],
    description: 'Filter elements by CSS selector (supports regex)'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: styleHelpSections.GENERAL,
    worksWith: [],
    description: 'Show help for this command'
  })
