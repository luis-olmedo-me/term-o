import { commandNames } from 'libs/command-parser/commands/command.constants'
import { handleClear } from './clear/clear.handler'

export default {
  [commandNames.CLEAR]: handleClear
}
