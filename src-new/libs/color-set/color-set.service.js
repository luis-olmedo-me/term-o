import { getDefaultMode } from './color-set.helpers'

class ColorSet {
  constructor(defaultColors) {
    this.values = defaultColors
  }

  get colors() {
    return this.values
  }
  get name() {
    return this.values.name
  }

  getColor(colorName) {
    return this.values[colorName]
  }

  setColors(newColors) {
    this.values = newColors
  }
  setCurrent(newThemeName) {
    this.themeName = newThemeName
  }
}

export const colorSet = new ColorSet(getDefaultMode())
