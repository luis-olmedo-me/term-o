import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { notifyHelpSections } from './notify.constants'
import { notifyHandler } from './notify.handler'

export default new CommandBase({
  name: commandNames.NOTIFY,
  handler: notifyHandler
})
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Create a notification',
    validate: [options.allow('tab-id', 'message', 'title'), options.requireAll('message', 'title')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Display notification in a specific tab (T[number])',
    validate: [value.isTabId, options.requireAnyOf('create')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Describe the notification title',
    validate: [options.requireAnyOf('create')]
  })
  .expect({
    name: 'message',
    abbreviation: 'm',
    type: commandTypes.STRING,
    helpSection: notifyHelpSections.ACTIONS,
    description: 'Describe the notification message',
    validate: [options.requireAnyOf('create')]
  })
