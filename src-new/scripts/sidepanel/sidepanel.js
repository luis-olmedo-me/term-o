import * as React from 'preact'

import { defaultTheme } from '@src/theme/theme.colors'
import { ThemeProvider } from 'styled-components'
import Terminal from './modules/Terminal'

React.render(
  <ThemeProvider theme={defaultTheme}>
    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
