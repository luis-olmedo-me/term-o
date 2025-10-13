import { storageDefaultValues, storageValues } from '@src/constants/storage.constants'
import { getStorageValue, setStorageValue } from '@src/helpers/storage.helpers'
import EventListener from '@src/templates/EventListener'

class Storage extends EventListener {
  constructor() {
    super()

    this.initiated = false
    this.values = storageDefaultValues

    this.init()
  }

  async init() {
    const promises = storageValues.map(({ namespace, key, defaultValue, Template }) => {
      return getStorageValue(namespace, key, defaultValue).then(result =>
        Template ? new Template(this, result) : result
      )
    })

    const results = await Promise.all(promises)

    storageValues.forEach((value, index) => {
      this.values[value.key] = results[index]
    })

    chrome.storage.onChanged.addListener(this.handleStorageChanges.bind(this))

    this.initiated = true
    this.dispatchEvent('init', this)
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
