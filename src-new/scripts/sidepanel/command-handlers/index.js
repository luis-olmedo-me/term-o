import { commandNames } from '@src/libs/command-parser'
import { handleDOM } from './dom/dom.handler'

export default {
  [commandNames.DOM]: handleDOM
}
