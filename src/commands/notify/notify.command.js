import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import { options, value } from '@src/helpers/validation-command.helpers'
import { notifyHandler } from './notify.handler'

export default new CommandBase({
  name: commandNames.NOTIFY,
  handler: notifyHandler
})
  .expect({
    name: 'create',
    abbreviation: 'c',
    type: commandTypes.BOOLEAN,
    helpSection: helpSections.ACTIONS,
    description: 'Create a notification',
    validate: [options.allow('tab-id', 'message', 'title'), options.requireAll('message', 'title')]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define a Tab ID where apply an action',
    validate: [value.isTabId, options.requireAnyOf('create')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the title',
    validate: [options.requireAnyOf('create')]
  })
  .expect({
    name: 'message',
    abbreviation: 'm',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Define the message',
    validate: [options.requireAnyOf('create')]
  })
