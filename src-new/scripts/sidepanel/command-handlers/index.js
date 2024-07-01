import { commandNames } from '@src/libs/command-parser'
import { handleDOM } from './dom/dom.handler'
import { handleSTORAGE } from './storage/storage.handler'
import { handleTABS } from './tabs/tabs.handler'

export default {
  [commandNames.DOM]: handleDOM,
  [commandNames.STORAGE]: handleSTORAGE,
  [commandNames.TABS]: handleTABS
}
