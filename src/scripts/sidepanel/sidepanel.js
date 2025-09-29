import * as React from 'preact'

import { ThemeProvider } from '@src/providers/ThemeProvider.provider'
import GlobalStyle from '@src/styles/Global.styles'
import Terminal from './modules/Terminal'

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
