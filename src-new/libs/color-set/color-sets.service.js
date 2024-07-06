import { defaultSets } from './color-sets.constants'
import { getDefaultMode } from './color-sets.helpers'

class ColorSets {
  constructor(defaultValues, themeName) {
    this.themes = defaultValues
    this.themeName = themeName
  }

  get colors() {
    return this.themes
  }
  get current() {
    return this.themeName
  }
  get currentColorSet() {
    const defaultColorSet = getDefaultMode()

    return this.themes.find(colorSet => colorSet.name === this.themeName) || defaultColorSet
  }

  getColor(colorName) {
    const colorSet = this.currentColorSet

    return colorSet[colorName]
  }

  setColors(newColors) {
    this.themes = newColors
  }
  setCurrent(newThemeName) {
    this.themeName = newThemeName
  }
}

export const colorSets = new ColorSets(defaultSets, getDefaultMode().name)
