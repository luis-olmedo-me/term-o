import useStorage from '@src/hooks/useStorage'

import { storageKeys } from '@src/constants/storage.constants'
import { createRootVariablesFromTheme } from '@src/helpers/themes.helpers'

export const ThemeProvider = ({ children }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  return (
    <div id="theme-provider" data-theme={config.theme.isDarkMode ? 'dark' : 'light'}>
      <style>{createRootVariablesFromTheme(config.theme)}</style>

      {children}
    </div>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}
