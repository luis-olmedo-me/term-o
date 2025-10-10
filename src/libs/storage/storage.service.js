import { defaultConfigSections } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { getStorageValue, setStorageValue } from '@src/helpers/storage.helpers'
import EventListener from '@src/templates/event-listener'

class Storage extends EventListener {
  constructor() {
    super()

    this.events = []
    this.history = []
    this.aliases = []
    this.config = defaultConfigSections

    this.init()
  }

  async init() {
    this.events = await getStorageValue(storageNamespaces.LOCAL, storageKeys.EVENTS, [])
    this.history = await getStorageValue(storageNamespaces.SESSION, storageKeys.HISTORY, [])
    this.aliases = await getStorageValue(storageNamespaces.LOCAL, storageKeys.ALIASES, [])
    this.config = await getStorageValue(
      storageNamespaces.LOCAL,
      storageKeys.CONFIG,
      defaultConfigSections
    )

    chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this))
  }

  get(storageKey) {
    if (storageKey === storageKeys.EVENTS) return this.events
    if (storageKey === storageKeys.HISTORY) return this.history
    if (storageKey === storageKeys.ALIASES) return this.aliases
    if (storageKey === storageKeys.CONFIG) return this.config
    return null
  }

  set(storageKey, newValue) {
    if (storageKey === storageKeys.EVENTS)
      return setStorageValue(storageNamespaces.LOCAL, storageKey, newValue)
    if (storageKey === storageKeys.HISTORY)
      return setStorageValue(storageNamespaces.SESSION, storageKey, newValue)
    if (storageKey === storageKeys.ALIASES)
      return setStorageValue(storageNamespaces.LOCAL, storageKey, newValue)
    if (storageKey === storageKeys.CONFIG)
      return setStorageValue(storageNamespaces.LOCAL, storageKey, newValue)
  }

  handleStorageChanges(changes) {
    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      switch (storageKey) {
        case storageKeys.EVENTS:
          this.events = newValue
          break

        case storageKeys.HISTORY:
          this.history = newValue
          break

        case storageKeys.ALIASES:
          this.aliases = newValue
          break

        case storageKeys.CONFIG:
          this.config = newValue
          break

        default:
          return
      }

      this.dispatchEvent(storageKey, this)
    }
  }
}

export const storage = new Storage()
