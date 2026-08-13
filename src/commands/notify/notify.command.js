import CommandBase from '@src/templates/CommandBase'

import { commandNames, commandTypes, helpSections } from '@src/constants/command.constants'
import {
  avaialableNotificationIcons,
  notificationIcons
} from '@src/constants/notifications.constants'
import { availableUserColors, customColorThemeKeys } from '@src/constants/themes.constants'
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
    validate: [
      options.allow('tab-id', 'message', 'title', 'icon', 'color'),
      options.mustHave('message', 'title')
    ]
  })
  .expect({
    name: 'tab-id',
    abbreviation: 'i',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify a Tab ID to apply the action',
    validate: [value.isTabId, options.requireOneOf('create')]
  })
  .expect({
    name: 'title',
    abbreviation: 't',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the title',
    validate: [options.requireOneOf('create')]
  })
  .expect({
    name: 'message',
    abbreviation: 'm',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the message',
    validate: [options.requireOneOf('create')]
  })
  .expect({
    name: 'icon',
    abbreviation: 'I',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the icon to show',
    validate: [value.isAnyOf(avaialableNotificationIcons), options.requireOneOf('create')],
    defaultValue: notificationIcons.DEFAULT
  })
  .expect({
    name: 'color',
    abbreviation: 'C',
    type: commandTypes.STRING,
    helpSection: helpSections.DETAILS,
    description: 'Specify the notification color',
    validate: [value.isAnyOf(availableUserColors), options.requireOneOf('create')],
    defaultValue: customColorThemeKeys.ACCENT
  })
