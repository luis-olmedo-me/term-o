import { defaultlDarkMode, defaultlLightMode } from './color-sets.constants'

export const getDefaultMode = () => {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? defaultlDarkMode
    : defaultlLightMode
}
