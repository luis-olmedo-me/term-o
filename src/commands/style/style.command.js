import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { array, options, value } from '@src/helpers/validation-command.helpers'
import { styleHandler } from './style.handler'

export default new CommandBase({
  name: commandNames.STYLE,
  handler: styleHandler
})
  .expect({
    name: 'list',
    abbreviation: 'l',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'List CSS styles applied to elements matching the criteria',
    validate: [options.allow('style', 'xpath'), options.requireAll('xpath')]
  })
  .expect({
    name: 'apply',
    abbreviation: 'a',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Apply styles to elements matching the criteria',
    validate: [options.requireAll('xpath', 'style')]
  })
  .expect({
    name: 'color-pick',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Pick a color by clicking on the web page',
    validate: [options.requireNoOther]
  })
  .expect({
    name: 'xpath',
    type: commandTypes.STRING,
    abbreviation: 'x',
    helpSection: helpSections.DETAILS,
    description: 'Define an XPath query',
    validate: [options.requireAnyOf('apply', 'list')]
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
        array.hasAllItemsAs(value.isString),
        array.hasItemAs(0, value.isSpaceForbidden)
      ),
      options.requireAnyOf('xpath')
    ]
  })
