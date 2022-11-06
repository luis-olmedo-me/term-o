import { defaultTheme } from './configuration.constants'

class Configuration {
  constructor() {
    this.theme = defaultTheme
  }

  setTheme(theme) {
    this.theme = { ...defaultTheme, ...theme }
  }
}

export const configuration = new Configuration()
