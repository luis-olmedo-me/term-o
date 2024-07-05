import { commandNames } from '@src/libs/command-parser'
import { handleALIAS } from './alias/alias.handler'
import { handleDOM } from './dom/dom.handler'
import { handleSTORAGE } from './storage/storage.handler'
import { handleTABS } from './tabs/tabs.handler'
import { handleTHEME } from './theme/theme.handler'

export default {
  [commandNames.DOM]: handleDOM,
  [commandNames.STORAGE]: handleSTORAGE,
  [commandNames.TABS]: handleTABS,
  [commandNames.ALIAS]: handleALIAS,
  [commandNames.THEME]: handleTHEME
}
