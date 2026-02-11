import { render } from 'preact'

import Terminal from '@sidepanel/components/Terminal'
import commandParser from '@src/libs/command-parser'
import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'
import './index.scss'

import { origins } from '@src/constants/command.constants'
import { setUpHandlers } from '@src/helpers/process.helpers'
import processHandlers from './process-handlers'

const sidepanelHandler = setUpHandlers(processHandlers)

commandParser.setOrigin(origins.MANUAL)
chrome.runtime.connect({ name: 'sidepanel' })
chrome.runtime.onMessage.addListener(sidepanelHandler)

render(
  <StorageProvider>
    <ThemeProvider>
      <Terminal />
    </ThemeProvider>
  </StorageProvider>,
  document.getElementById('root')
)
