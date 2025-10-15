import * as React from 'preact'

import Terminal from '@sidepanel/components/Terminal'
import commandParser from '@src/libs/command-parser'
import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'
import GlobalStyle from '@src/styles/Global.styles'

import { executionContexts } from '@src/constants/command.constants'

commandParser.setExecutionContext(executionContexts.SIDEPANEL)

// eslint-disable-next-line react/no-deprecated
React.render(
  <StorageProvider>
    <ThemeProvider>
      <GlobalStyle />

      <Terminal />
    </ThemeProvider>
  </StorageProvider>,
  document.getElementById('root')
)
