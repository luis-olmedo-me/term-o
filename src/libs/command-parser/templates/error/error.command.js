import { commandNames } from '../../command-parser.constants'
import CommandTemplate from '../../sub-services/command-template'
import { errorHelpSections, errorHelpSectionTitles } from './error.constants'

export default new CommandTemplate({
  name: commandNames.ERROR,
  helpSectionTitles: errorHelpSectionTitles
})
  .expect({
    name: 'title',
    type: 'string',
    abbreviation: 't',
    helpSection: errorHelpSections.ACTIONS,
    description: 'Throw an error with a custom message',
    worksWith: []
  })
  .expect({
    name: 'help',
    type: 'boolean',
    abbreviation: 'h',
    helpSection: errorHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
