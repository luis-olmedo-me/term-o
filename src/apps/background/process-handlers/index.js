import dispatchTabEvent from './dispatch-tab-event.process'
import executeCommand from './execute-command.process'
import getEvents from './get-events.process'
import getFontsAvailable from './get-fonts-available.process'
import importInjectableScripts from './import-injectable-scripts.process'

import { processNames } from '@src/constants/process.constants'

export default {
  [processNames.DISPATCH_TAB_EVENT]: dispatchTabEvent,
  [processNames.EXECUTE_COMMAND]: executeCommand,
  [processNames.GET_EVENTS]: getEvents,
  [processNames.GET_FONTS_AVAILABLE]: getFontsAvailable,
  [processNames.IMPORT_INJECTABLE_SCRIPTS]: importInjectableScripts
}
