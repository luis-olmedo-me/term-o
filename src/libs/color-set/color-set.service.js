import { defaultlDarkMode } from './color-set.constants'

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
}

export const colorSet = new ColorSet(defaultlDarkMode)
