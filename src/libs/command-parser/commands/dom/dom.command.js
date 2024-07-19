import { commandNames } from '../../command-parser.constants'
import Command from '../../sub-services/command'
import { isInRange, isRegExp, isTabId, isXpath } from '../validators'

export const createDOM = () => {
  return new Command({ name: commandNames.DOM })
    .expect({
      name: 'search-xpath',
      type: 'string',
      abbreviation: 'X',
      worksWith: ['click', 'tab-id'],
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
      name: 'search',
      type: 'boolean',
      abbreviation: 's',
      worksWith: ['attr', 'style', 'tag', 'group', 'text', 'content', 'xpath', 'tab-id'],
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
      validate: [isRegExp, isInRange(0, 2)]
    })
    .expect({
      name: 'style',
      type: 'string-array',
      abbreviation: 'S',
      description: 'Filter elements by CSS styles matching specified regular expressions.',
      validate: [isRegExp, isInRange(0, 2)]
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
      name: 'help',
      type: 'boolean',
      abbreviation: 'h',
      description: 'Display help about the options available for this command.',
      worksWith: []
    })
}
