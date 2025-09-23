import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { hasAllItemsAs, hasInRangeLength, isInlineStyles, isRegExp, isXpath } from '../validators'

export default new CommandTemplate({ name: commandNames.STYLE })
  .expect({
    name: 'list',
    type: 'boolean',
    abbreviation: 'l',
    worksWith: ['on', 'property', 'selector'],
    mustHave: ['on'],
    description: 'List CSS styles applied to elements and their selectors matching the criteria.'
  })
  .expect({
    name: 'apply',
    type: 'string',
    abbreviation: 'a',
    validate: [isInlineStyles],
    worksWith: ['on'],
    mustHave: ['on'],
    description: 'Apply inline styles to elements matching the criteria.'
  })
  .expect({
    name: 'on',
    type: 'string',
    abbreviation: 'o',
    validate: [isXpath],
    description: 'XPath expression to select elements.'
  })
  .expect({
    name: 'property',
    type: 'string-array',
    abbreviation: 'p',
    validate: [hasAllItemsAs(isRegExp), hasInRangeLength(0, 2)],
    description: 'Filter styles by property names matching specified patterns.'
  })
  .expect({
    name: 'selector',
    type: 'string',
    abbreviation: 's',
    validate: [hasAllItemsAs(isRegExp)],
    description: 'Filter elements by CSS selector matching a regular expression.'
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    description: 'Display help about the options available for this command.',
    worksWith: []
  })
