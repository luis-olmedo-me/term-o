import aliasBase from './alias/alias.command'
import { handleALIAS } from './alias/alias.handler'
import clearBase from './clear/clear.command'
import { handleCLEAR } from './clear/clear.handler'
import domBase from './dom/dom.command'
import { handleDOM } from './dom/dom.handler'
import errorBase from './error/error.command'
import { handleERROR } from './error/error.handler'
import eventsBase from './events/events.command'
import { handleEVENTS } from './events/events.handler'
import historyBase from './history/history.command'
import { handleHistory } from './history/history.handler'
import requestBase from './request/request.command'
import { handleREQUEST } from './request/request.handler'
import scriptsBase from './scripts/scripts.command'
import { handleSCRIPTS } from './scripts/scripts.handler'
import storageBase from './storage/storage.command'
import { handleSTORAGE } from './storage/storage.handler'
import styleBase from './style/style.command'
import { handleSTYLES } from './style/style.handler'
import tabsBase from './tabs/tabs.command'
import { handleTABS } from './tabs/tabs.handler'
import themeBase from './theme/theme.command'
import { handleTHEME } from './theme/theme.handler'

export default [
  clearBase.handledBy(handleCLEAR),
  domBase.handledBy(handleDOM),
  storageBase.handledBy(handleSTORAGE),
  tabsBase.handledBy(handleTABS),
  aliasBase.handledBy(handleALIAS),
  themeBase.handledBy(handleTHEME),
  styleBase.handledBy(handleSTYLES),
  errorBase.handledBy(handleERROR),
  eventsBase.handledBy(handleEVENTS),
  historyBase.handledBy(handleHistory),
  requestBase.handledBy(handleREQUEST),
  scriptsBase.handledBy(handleSCRIPTS)
]

export {
  aliasBase,
  clearBase,
  domBase,
  errorBase,
  eventsBase,
  historyBase,
  requestBase,
  scriptsBase,
  storageBase,
  styleBase,
  tabsBase,
  themeBase
}
