import * as React from 'preact'

import commandParser from '@src/libs/command-parser'
import ThemeProvider from '@src/providers/ThemeProvider'
import GlobalStyle from '@src/styles/Global.styles'
import Terminal from './modules/Terminal'

import { executionContexts } from '@src/constants/command.constants'

commandParser.setExecutionContext(executionContexts.SIDEPANEL)

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
