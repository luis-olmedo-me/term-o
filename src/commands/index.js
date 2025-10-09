import aliasBase from './alias/alias.command'
import clearBase from './clear/clear.command'
import domBase from './dom/dom.command'
import errorBase from './error/error.command'
import eventsBase from './events/events.command'
import historyBase from './history/history.command'
import requestBase from './request/request.command'
import scriptsBase from './scripts/scripts.command'
import storageBase from './storage/storage.command'
import styleBase from './style/style.command'
import tabsBase from './tabs/tabs.command'
import themeBase from './theme/theme.command'

export default [
  clearBase,
  domBase,
  storageBase,
  tabsBase,
  aliasBase,
  themeBase,
  styleBase,
  errorBase,
  eventsBase,
  historyBase,
  requestBase,
  scriptsBase
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
