import * as React from 'preact'

import { ThemeProvider } from '@src/providers/ThemeProvider.provider'
import GlobalStyle from '@src/styles/Global.styles'
import Preferences from './components/Preferences'

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Preferences />
  </ThemeProvider>,
  document.getElementById('root')
)
