import * as React from 'preact'

import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'
import GlobalStyle from '@src/styles/Global.styles'
import Preferences from './components/Preferences'

// eslint-disable-next-line react/no-deprecated
React.render(
  <StorageProvider>
    <ThemeProvider>
      <GlobalStyle />

      <Preferences />
    </ThemeProvider>
  </StorageProvider>,
  document.getElementById('root')
)
