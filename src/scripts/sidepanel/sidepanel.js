import * as React from 'preact'

import Terminal from './modules/Terminal'
import { ThemeProvider } from './providers/ThemeProvider.provider'
import GlobalStyle from './styles/Global.styles'

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
