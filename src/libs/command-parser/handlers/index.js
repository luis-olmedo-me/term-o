import { handleALIAS } from './alias/alias.handler'
import { handleCLEAR } from './clear/clear.handler'
import { handleDOM } from './dom/dom.handler'
import { handleERROR } from './error/error.handler'
import { handleEVENTS } from './events/events.handler'
import { handleSTORAGE } from './storage/storage.handler'
import { handleSTYLES } from './style/style.handler'
import { handleTABS } from './tabs/tabs.handler'
import { handleTHEME } from './theme/theme.handler'

import { commandNames } from '@src/libs/command-parser'

export default {
  [commandNames.DOM]: handleDOM,
  [commandNames.STORAGE]: handleSTORAGE,
  [commandNames.TABS]: handleTABS,
  [commandNames.ALIAS]: handleALIAS,
  [commandNames.THEME]: handleTHEME,
  [commandNames.STYLE]: handleSTYLES,
  [commandNames.CLEAR]: handleCLEAR,
  [commandNames.EVENTS]: handleEVENTS,
  [commandNames.ERROR]: handleERROR
}
