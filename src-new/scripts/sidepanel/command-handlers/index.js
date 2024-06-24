import { commandNames } from 'libs/command-parser/sub-services/command/command.constants'
import { handleCLEAR } from './clear/clear.handler'
import { handleDOM } from './dom/dom.handler'

export default {
  [commandNames.CLEAR]: handleCLEAR,
  [commandNames.DOM]: handleDOM
}
