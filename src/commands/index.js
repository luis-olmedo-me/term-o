import aliasBase from './alias/alias.command'
import aliasHandler from './alias/alias.handler'
import clearBase from './clear/clear.command'
import clearHandler from './clear/clear.handler'
import domBase from './dom/dom.command'
import domHandler from './dom/dom.handler'
import errorBase from './error/error.command'
import errorHandler from './error/error.handler'
import eventsBase from './events/events.command'
import eventsHandler from './events/events.handler'
import historyBase from './history/history.command'
import historyHandler from './history/history.handler'
import requestBase from './request/request.command'
import requestHandler from './request/request.handler'
import scriptsBase from './scripts/scripts.command'
import scriptsHandler from './scripts/scripts.handler'
import storageBase from './storage/storage.command'
import storageHandler from './storage/storage.handler'
import styleBase from './style/style.command'
import stylesHandler from './style/style.handler'
import tabsBase from './tabs/tabs.command'
import tabsHandler from './tabs/tabs.handler'
import themeBase from './theme/theme.command'
import themeHandler from './theme/theme.handler'

export default [
  clearBase.handledBy(clearHandler),
  domBase.handledBy(domHandler),
  storageBase.handledBy(storageHandler),
  tabsBase.handledBy(tabsHandler),
  aliasBase.handledBy(aliasHandler),
  themeBase.handledBy(themeHandler),
  styleBase.handledBy(stylesHandler),
  errorBase.handledBy(errorHandler),
  eventsBase.handledBy(eventsHandler),
  historyBase.handledBy(historyHandler),
  requestBase.handledBy(requestHandler),
  scriptsBase.handledBy(scriptsHandler)
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
