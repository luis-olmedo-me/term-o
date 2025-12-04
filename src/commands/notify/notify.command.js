import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { notifyHelpSectionTitles, notifyHelpSections } from './notify.constants'
import { notifyHandler } from './notify.handler'

export default new CommandBase({
  name: commandNames.NOTIFY,
  helpSectionTitles: notifyHelpSectionTitles,
  handler: notifyHandler
})
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Create a notification',
    worksWith: ['title', 'message']
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Describe the notification title'
  })
  .expect({
    name: 'message',
    abbreviation: 'm',
    type: commandTypes.STRING,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Describe the notification message'
  })
  .expect({
    name: 'help',
    abbreviation: 'h',
    type: commandTypes.BOOLEAN,
    helpSection: notifyHelpSections.GENERAL,
    description: 'Show help for this command',
    worksWith: []
  })
