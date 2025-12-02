import EventListener from '@src/templates/EventListener'

import { getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import {
  storageKeysNonExportables,
  storageKeysNonResetables,
  storageValues
} from '@src/constants/storage.constants'
import { download } from '@src/helpers/file.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'
import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

class Storage extends EventListener {
  constructor() {
    super()

    this.initiated = false
    this.manualMode = false
    this.handleStorageChangesRef = this.handleStorageChanges.bind(this)
    this.values = storageValues.reduce(
      (values, { key, Template, defaultValue, namespace, json }) => {
        const storageValue = { value: defaultValue, version: null }
        const props = { key, namespace, json, storageValue }

        return {
          ...values,
          [key]: new Template(this, props)
        }
      },
      {}
    )

    this.init()
  }

  async init() {
    const promises = storageValues.map(({ namespace, key, defaultValue, json }) => {
      const defaultStorageValue = { value: defaultValue, version: null }

      return getStorageValue(namespace, key, defaultStorageValue, json).then(result => {
        const isDefault = result.value === defaultValue

        if (!isDefault) this.getInstance(key).$update(result)
      })
    })

    await Promise.all(promises)

    if (!this.manualMode) chrome.storage.onChanged.addListener(this.handleStorageChangesRef)

    this.initiated = true
    this.dispatchEvent('init', this)
  }

  async restart() {
    const promises = Object.entries(this.values).map(([key, instance]) => {
      return getStorageValue(instance.$namespace, key, instance.$storageValue, instance.$json).then(
        result => {
          const isDefault = result.value === instance.$storageValue

          if (!isDefault) this.getInstance(key).$update(result)
        }
      )
    })

    await Promise.all(promises)

    if (!this.manualMode && chrome.storage.onChanged.hasListener(this.handleStorageChangesRef)) {
      chrome.storage.onChanged.removeListener(this.handleStorageChangesRef)
    }
    if (!this.manualMode) {
      chrome.storage.onChanged.addListener(this.handleStorageChangesRef)
    }

    this.dispatchEvent('restart', this)
  }

  reset() {
    storageValues.forEach(({ key, defaultValue }) => {
      const canReset = !storageKeysNonResetables.includes(key)

      if (canReset) this.set(key, defaultValue)
    })
  }

  export() {
    const exportables = storageValues.reduce((exportable, { key }) => {
      const canExport = !storageKeysNonExportables.includes(key)

      const instance = this.getInstance(key)
      const value = instance.$latest().value

      return canExport ? { ...exportable, [key]: value } : exportable
    }, {})

    const exportableString = JSON.stringify(exportables)

    download('term-o-export.termo.txt', compressToUTF16(exportableString))
  }

  get(storageKey) {
    return this.getInstance(storageKey).$value
  }

  set(storageKey, newValue) {
    if (storageKey in this.values) {
      const instance = this.getInstance(storageKey)

      instance.$update({ value: newValue, version: createUUIDv4() })
      setStorageValue(instance.$namespace, storageKey, instance.$latest(), instance.$json)
    }
  }

  getInstance(storageKey) {
    return this.values[storageKey]
  }

  handleStorageChanges(changes) {
    for (let [storageKey, { newValue: compressedValue }] of Object.entries(changes)) {
      if (!(storageKey in this.values)) return
      const instance = this.getInstance(storageKey)

      const decompressedValue = decompressFromUTF16(compressedValue)
      const value = instance.$json ? JSON.parse(decompressedValue) : decompressedValue

      instance.$update(value)
      this.dispatchEvent(storageKey, this)
    }
  }

  handleStorageChangesManually() {
    chrome.storage.onChanged.removeListener(this.handleStorageChangesRef)
    this.manualMode = true
  }
}

export const storage = new Storage()
