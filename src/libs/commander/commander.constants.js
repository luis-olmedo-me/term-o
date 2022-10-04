import { aliasConfig } from './components/CommandAlias/CommandAlias.constants'
import { clearConfig } from './components/CommandClear/CommandClear.constants'
import { cssConfig } from './components/CommandCss/CommandCss.constants'
import { domConfig } from './components/CommandDom/CommandDom.constants'
import { eventConfig } from './components/CommandEvent/CommandEvent.constants'
import { onConfig } from './components/CommandOn/CommandOn.constants'
import { storageConfig } from './components/CommandStorage/CommandStorage.constants'
import { helpConfig } from './components/CommandHelp/CommandHelp.constants'
import { notifyConfig } from './components/CommandNotify/CommandNotify.constants'
import { tabsConfig } from './components/CommandTabs/CommandTabs.constants'
import { inspectConfig } from './components/CommandInspect/CommandInspect.constants'

export const consoleCommands = {
  dom: domConfig,
  css: cssConfig,
  on: onConfig,
  event: eventConfig,
  clear: clearConfig,
  alias: aliasConfig,
  storage: storageConfig,
  help: helpConfig,
  notify: notifyConfig,
  tabs: tabsConfig,
  inspect: inspectConfig
}
