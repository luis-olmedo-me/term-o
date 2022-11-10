import { defaultTheme } from './configuration.constants'

class Configuration {
  constructor() {
    this.theme = defaultTheme
  }

  setTheme(theme) {
    this.theme = { ...defaultTheme, ...theme }
  }
  getTheme(pathsString) {
    const paths = pathsString.split('.')

    return paths.reduce((theme, path) => theme[path], this.theme)
  }
}

export const configuration = new Configuration()
