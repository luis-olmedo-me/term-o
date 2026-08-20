import processHandlers from '@content/process-handlers'
import processManager from '@src/libs/process-manager'

import { registerTabEvents } from '@src/helpers/options.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)

registerTabEvents()
importWebComponents()
processManager.importInjectableScripts()
