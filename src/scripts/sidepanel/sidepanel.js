import * as React from 'preact'

import commandParser, { executionContexts } from '@src/libs/command-parser'
import ThemeProvider from '@src/providers/ThemeProvider'
import GlobalStyle from '@src/styles/Global.styles'
import Terminal from './modules/Terminal'

commandParser.setExecutionContext(executionContexts.SIDEPANEL)

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
