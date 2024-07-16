import { commandNames } from '@src/libs/command-parser'
import { handleALIAS } from './alias/alias.handler'
import { handleDOM } from './dom/dom.handler'
import { handleSTORAGE } from './storage/storage.handler'
import { handleSTYLES } from './style/style.handler'
import { handleTABS } from './tabs/tabs.handler'
import { handleTHEME } from './theme/theme.handler'

import { getCurrentTab } from './tabs/tabs.helpers'

export default {
  [commandNames.DOM]: handleDOM,
  [commandNames.STORAGE]: handleSTORAGE,
  [commandNames.TABS]: handleTABS,
  [commandNames.ALIAS]: handleALIAS,
  [commandNames.THEME]: handleTHEME,
  [commandNames.STYLE]: handleSTYLES
}

export { getCurrentTab }
