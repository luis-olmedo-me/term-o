import { defaultlDarkMode, defaultlLightMode } from './color-sets.constants'

class ColorSets {
  constructor(defaults, themeName) {
    this.value = defaults
    this.themeName = themeName
  }

  get colors() {
    return this.value
  }
  get current() {
    return this.themeName
  }

  setColors(newColors) {
    this.value = newColors
  }
  setThmeName(newThemeName) {
    this.themeName = newThemeName
  }
}

export const colorSets = new ColorSets([defaultlDarkMode, defaultlLightMode])
