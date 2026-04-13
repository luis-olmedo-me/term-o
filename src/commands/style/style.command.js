import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
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
    validate: [options.allow('property', 'on'), options.requireAll('on')]
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: commandTypes.ARRAY,
    helpSection: styleHelpSections.MODIFICATION,
    description: 'Apply styles to elements matching the criteria',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLength(2),
        array.hasAllItemsAs(value.isString),
        array.hasItemAs(0, value.isSpaceForbidden)
      ),
      options.requireAll('on')
    ]
  })
  .expect({
    name: 'color-pick',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: styleHelpSections.TOOLS,
    description: 'Pick a color by clicking on the web page',
    validate: [options.requireNoOther()]
  })
  .expect({
    name: 'on',
    abbreviation: 'o',
    type: commandTypes.STRING,
    description: 'XPath expression to select elements',
    helpSection: styleHelpSections.RETRIEVAL
  })
  .expect({
    name: 'property',
    abbreviation: 'p',
    type: commandTypes.ARRAY,
    helpSection: styleHelpSections.FILTERS,
    description: 'Filter styles by property names (regex[])',
    repeatable: true,
    validate: [
      array.hasAllItemsAs(
        value.isArray,
        array.hasLengthBetween(1, 2),
        array.hasAllItemsAs(value.isRegExp, value.isString)
      )
    ]
  })
