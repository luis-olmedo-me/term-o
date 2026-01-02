import { render } from 'preact'

import Terminal from '@sidepanel/components/Terminal'
import commandParser from '@src/libs/command-parser'
import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'
import './index.scss'

import { origins } from '@src/constants/command.constants'

commandParser.setOrigin(origins.MANUAL)

render(
  <StorageProvider>
    <ThemeProvider>
      <Terminal />
    </ThemeProvider>
  </StorageProvider>,
  document.getElementById('root')
)
