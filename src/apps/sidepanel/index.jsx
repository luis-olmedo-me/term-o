import { render } from 'preact'

import Terminal from '@sidepanel/components/Terminal'
import processHandlers from '@sidepanel/process-handlers'
import commandParser from '@src/libs/command-parser'
import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'

import { connectToBackground } from '@sidepanel/helpers/conection.helpers'
import { origins } from '@src/constants/command.constants'
import { setUpHandlers } from '@src/helpers/process.helpers'
import './index.scss'

const sidepanelHandler = setUpHandlers(processHandlers)

connectToBackground()
commandParser.setOrigin(origins.MANUAL)
chrome.runtime.onMessage.addListener(sidepanelHandler)

render(
  <StorageProvider>
    <ThemeProvider>
      <Terminal />
    </ThemeProvider>
  </StorageProvider>,
  document.getElementById('root')
)
