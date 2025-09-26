import * as React from 'preact'

import { ThemeProvider } from '../sidepanel/providers/ThemeProvider.provider'
import GlobalStyle from '../sidepanel/styles/Global.styles'
import Preferences from './components/PreferencesModal'

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <Preferences />
  </ThemeProvider>,
  document.getElementById('root')
)
