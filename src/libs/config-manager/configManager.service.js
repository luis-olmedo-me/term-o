class ConfigManager {
  constructor() {
    this.config = {
      consolePosition: {},
      pageEvents: [],
      aliases: {}
    }
    this.onChange = () => {}
  }

  get aliases() {
    return this.config.aliases
  }
  get pageEvents() {
    return this.config.pageEvents
  }
  get consolePosition() {
    return this.config.consolePosition
  }

  setConfig(newConfig, sender) {
    this.config = { ...this.config, ...newConfig }
    this.setConfigInLocalStorage(sender)

    return this
  }

  init() {
    this.getConfigFromLocalStorage()

    return this
  }

  getConfigFromLocalStorage() {
    const receiveConfiguration = ({ configuration = {} }) => {
      this.config = { ...this.config, ...configuration }
    }

    chrome.storage.sync.get('configuration', receiveConfiguration)
  }

  setConfigInLocalStorage(sender) {
    chrome.storage.sync.set({
      configuration: this.config
    })

    this.onChange(sender)
  }
}

export const configManager = new ConfigManager().init()
