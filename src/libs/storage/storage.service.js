import { storageValues } from '@src/constants/storage.constants'
import { getStorageValue, setStorageValue } from '@src/helpers/storage.helpers'
import EventListener from '@src/templates/event-listener'

class Storage extends EventListener {
  constructor() {
    super()

    this.values = {}

    this.init()
  }

  async init() {
    for (const value of storageValues) {
      this.values[value.key] = await getStorageValue(value.namespace, value.key, value.default)
    }

    chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this))
  }

  get(storageKey) {
    if (storageKey in this.values) return this.values[storageKey]
    else return null
  }

  set(storageKey, newValue) {
    if (storageKey in this.values) {
      const storageDefaults = storageValues.find(value => value.key === storageKey)

      setStorageValue(storageDefaults.namespace, storageKey, newValue)
    }
  }

  handleStorageChanges(changes) {
    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey in this.values) {
        this.values[storageKey] = newValue
      }

      this.dispatchEvent(storageKey, this)
    }
  }
}

export const storage = new Storage()
