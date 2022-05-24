import { aliasConfig } from './components/CommandAlias/CommandAlias.constants'
import { clearConfig } from './components/CommandClear/CommandClear.constants'
import { cssConfig } from './components/CommandCss/CommandCss.constants'
import { domConfig } from './components/CommandDom/CommandDom.constants'
import { eventConfig } from './components/CommandEvent/CommandEvent.constants'
import { historyConfig } from './components/CommandHistory/CommandHistory.constants'
import { onConfig } from './components/CommandOn/CommandOn.constants'
import { storageConfig } from './components/CommandStorage/CommandStorage.constants'

export const consoleCommands = {
  dom: domConfig,
  css: cssConfig,
  on: onConfig,
  event: eventConfig,
  clear: clearConfig,
  history: historyConfig,
  alias: aliasConfig,
  storage: storageConfig
}
