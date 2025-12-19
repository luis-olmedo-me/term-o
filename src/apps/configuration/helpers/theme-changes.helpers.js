import { storageKeys } from '@src/constants/storage.constants'
import { webElements } from '@src/constants/web-elements.constants'

export const handleThemeChanges = updatedStorage => {
  const config = updatedStorage.get(storageKeys.CONFIG)

  Object.values(webElements).forEach(name => {
    const elements = document.querySelectorAll(name)

    elements.forEach(element => {
      const themeEvent = new CustomEvent('new-theme', { detail: config.theme })

      element.dispatchEvent(themeEvent)
    })
  })
}
