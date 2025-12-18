import * as React from 'preact'

import storage from '@src/libs/storage'

import { storageKeys } from '@src/constants/storage.constants'
import { webElements } from '@src/constants/web-elements.constants'
import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'
import GlobalStyle from '@src/styles/Global.styles'
import { importWebComponents } from '../content/helpers/web-components.helpers'
import Preferences from './components/Preferences'

importWebComponents()

storage.addEventListener(storageKeys.CONFIG, updatedStorage => {
  const config = updatedStorage.get(storageKeys.CONFIG)

  Object.values(webElements).forEach(name => {
    const elements = document.querySelectorAll(name)

    elements.forEach(element => {
      const themeEvent = new CustomEvent('theme', { detail: config.theme })

      element.dispatchEvent(themeEvent)
    })
  })
})

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
