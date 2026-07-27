import CommandBase from '@src/templates/CommandBase'

import { commandNames } from '@src/constants/command.constants'
import { urlHandler } from './url.handler'

export default new CommandBase({
  name: commandNames.URL,
  handler: urlHandler
})
