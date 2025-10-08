import { commandNames } from '@src/constants/command.constants'

import { handleALIAS } from './alias/alias.handler'
import { handleCLEAR } from './clear/clear.handler'
import { handleDOM } from './dom/dom.handler'
import { handleERROR } from './error/error.handler'
import { handleEVENTS } from './events/events.handler'
import { handleHistory } from './history/history.handler'
import { handleREQUEST } from './request/request.handler'
import { handleSCRIPTS } from './scripts/scripts.handler'
import { handleSTORAGE } from './storage/storage.handler'
import { handleSTYLES } from './style/style.handler'
import { handleTABS } from './tabs/tabs.handler'
import { handleTHEME } from './theme/theme.handler'

export default {
  [commandNames.DOM]: handleDOM,
  [commandNames.STORAGE]: handleSTORAGE,
  [commandNames.TABS]: handleTABS,
  [commandNames.ALIAS]: handleALIAS,
  [commandNames.THEME]: handleTHEME,
  [commandNames.STYLE]: handleSTYLES,
  [commandNames.CLEAR]: handleCLEAR,
  [commandNames.EVENTS]: handleEVENTS,
  [commandNames.ERROR]: handleERROR,
  [commandNames.HISTORY]: handleHistory,
  [commandNames.REQUEST]: handleREQUEST,
  [commandNames.SCRIPTS]: handleSCRIPTS
}
