import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { clearHandler } from './clear.handler'

export default new CommandBase({
  name: commandNames.CLEAR,
  handler: clearHandler
})
