import { commandNames } from '@src/libs/command-parser'
import { handleCLEAR } from './clear/clear.handler'
import { handleDOM } from './dom/dom.handler'

export default {
  [commandNames.CLEAR]: handleCLEAR,
  [commandNames.DOM]: handleDOM
}
