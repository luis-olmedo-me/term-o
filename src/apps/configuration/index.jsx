import * as React from 'preact'

import storage from '@src/libs/storage'

import Preferences from '@configuration/components/Preferences'
import StorageProvider from '@src/providers/StorageProvider'
import ThemeProvider from '@src/providers/ThemeProvider'
import './index.scss'

import { handleThemeChanges } from '@configuration/helpers/theme-changes.helpers'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { importWebComponents } from '@src/helpers/web-components.helpers'

importWebComponents()

storage.addEventListener(`${storageKeys.CONFIG}_${configInputIds.COLOR_ACCENT}`, handleThemeChanges)
storage.addEventListener(`${storageKeys.CONFIG}_${configInputIds.THEME_NAME}`, handleThemeChanges)
storage.addEventListener(`${storageKeys.CONFIG}_${configInputIds.FONT_FAMILY}`, handleThemeChanges)

// eslint-disable-next-line react/no-deprecated
React.render(
  <StorageProvider>
    <ThemeProvider>
      <Preferences />
    </ThemeProvider>
  </StorageProvider>,
  document.getElementById('root')
)
