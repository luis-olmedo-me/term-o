import executeCommand from './execute-command.process'
import getFontsAvailable from './get-fonts-available.process'

import { processNames } from '@src/constants/process.constants'

export default {
  [processNames.GET_FONTS_AVAILABLE]: getFontsAvailable,
  [processNames.EXECUTE_COMMAND]: executeCommand
}
