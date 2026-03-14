import useStorage from '@src/hooks/useStorage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { createCssVariablesFromTheme } from '@src/helpers/themes.helpers'
import { getClassNameByInputsCaret } from './ThemeProvider.helpers'
import { provider } from './ThemeProvider.module.scss'

export const ThemeProvider = ({ children }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const caretShape = config.getValueById(configInputIds.CARET_SHAPE)

  return (
    <div
      id="theme-provider"
      data-inputs-caret={caretShape}
      className={`
        ${provider}
        ${getClassNameByInputsCaret(caretShape)}
        theme-provider-${config.theme.isDarkMode ? 'dark' : 'light'}
      `}
    >
      <style>{createCssVariablesFromTheme(config.theme)}</style>

      {children}
    </div>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}
