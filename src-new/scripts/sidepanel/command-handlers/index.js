import { commandNames } from 'libs/command-parser/commands/command.constants'
import { handleCLEAR } from './clear/clear.handler'
import { handleDOM } from './dom/dom.handler'

export default {
  [commandNames.CLEAR]: handleCLEAR,
  [commandNames.DOM]: handleDOM
}
