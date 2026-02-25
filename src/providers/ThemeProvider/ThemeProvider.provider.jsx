import useStorage from '@src/hooks/useStorage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createRootVariablesFromTheme } from '@src/helpers/themes.helpers'

export const ThemeProvider = ({ children }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const caretShape = config.getValueById(configInputIds.CARET_SHAPE)

  return (
    <div
      id="theme-provider"
      data-theme={config.theme.isDarkMode ? 'dark' : 'light'}
      data-inputs-caret={caretShape}
    >
      <style>{createRootVariablesFromTheme(config.theme)}</style>

      {children}
    </div>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}
