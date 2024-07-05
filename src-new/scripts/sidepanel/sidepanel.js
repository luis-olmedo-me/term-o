import * as React from 'preact'

import { defaultTheme } from '@src/theme/theme.colors'

import Terminal from './modules/Terminal'
import { ThemeProvider } from './providers/ThemeProvider.provider'
import GlobalStyle from './styles/Global.styles'

React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
