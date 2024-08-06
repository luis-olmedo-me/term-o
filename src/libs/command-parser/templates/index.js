import aliasTemplate from './alias/alias.command'
import clearTemplate from './clear/clear.command'
import domTemplate from './dom/dom.command'
import errorTemplate from './error/error.command'
import eventsTemplate from './events/events.command'
import historyTemplate from './history/history.command'
import requestTemplate from './request/request.command'
import storageTemplate from './storage/storage.command'
import styleTemplate from './style/style.command'
import tabsTemplate from './tabs/tabs.command'
import themeTemplate from './theme/theme.command'

export default [
  clearTemplate,
  domTemplate,
  storageTemplate,
  tabsTemplate,
  aliasTemplate,
  themeTemplate,
  styleTemplate,
  errorTemplate,
  eventsTemplate,
  historyTemplate,
  requestTemplate
]

export {
  aliasTemplate,
  clearTemplate,
  domTemplate,
  errorTemplate,
  eventsTemplate,
  historyTemplate,
  requestTemplate,
  storageTemplate,
  styleTemplate,
  tabsTemplate,
  themeTemplate
}
