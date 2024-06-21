import * as React from 'preact'
import Terminal from './modules/Terminal'
import { defaultTheme } from './theme/theme.constants'

React.render(
  <ThemeProvider theme={defaultTheme}>
    <Terminal />
  </ThemeProvider>,
  document.getElementById('root')
)
