import * as React from 'preact'

import GlobalStyle from '../sidepanel/styles/Global.styles'
import PreferencesModal from './components/PreferencesModal'
import { ThemeProvider } from './providers/ThemeProvider.provider'

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <PreferencesModal open onClose={() => {}} />
  </ThemeProvider>,
  document.getElementById('root')
)
