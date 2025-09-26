import * as React from 'preact'

import { ThemeProvider } from '../sidepanel/providers/ThemeProvider.provider'
import GlobalStyle from '../sidepanel/styles/Global.styles'
import PreferencesModal from './components/PreferencesModal'

// eslint-disable-next-line react/no-deprecated
React.render(
  <ThemeProvider>
    <GlobalStyle />

    <PreferencesModal open onClose={() => {}} />
  </ThemeProvider>,
  document.getElementById('root')
)
