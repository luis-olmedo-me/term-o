import * as React from 'preact'

import { defaultTheme } from '@src/theme/theme.colors'
import { ThemeProvider } from 'styled-components'
import Terminal from './modules/Terminal'
import GlobalStyle from './styles/Global.styles'

React.render(
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />

    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
