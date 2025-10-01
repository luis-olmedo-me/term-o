import { ThemeTypes } from '@src/constants/themes.constants'

export const getSystemTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeTypes.DARK
    : ThemeTypes.LIGHT
}
