import { deleteStorageValue, getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageKeys } from '@src/constants/storage.constants'
import StorageSimple from '../StorageSimple'

export class StorageAddons extends StorageSimple {
  get $value() {
    return {
      values: this.$latest().value,
      delete: this.delete.bind(this),
      getMetadata: this.getMetadata.bind(this),
      add: this.add.bind(this),
      get: this.get.bind(this),
      has: this.has.bind(this)
    }
  }

  add({ name, version, handler, options }) {
    const newAddons = this.$latest().value.concat({ name, version })

    this.$storageService.set(storageKeys.ADDONS, newAddons)
    setStorageValue(this.$namespace, `addon_${name}_handler`, handler, false)
    setStorageValue(this.$namespace, `addon_${name}_options`, options, false)
  }

  delete(name) {
    const newAddons = this.$latest().value.filter(addon => addon.name !== name)

    this.$storageService.set(storageKeys.ADDONS, newAddons)
    deleteStorageValue(this.$namespace, `addon_${name}_handler`)
    deleteStorageValue(this.$namespace, `addon_${name}_options`)
  }

  async get(name) {
    const isValid = this.$latest().value.some(addon => addon.name === name)

    if (!isValid) return null

    return getStorageValue(this.$namespace, `addon_${name}`, null, false)
  }

  getMetadata(name) {
    return this.$latest().value.find(addon => addon.name === name)
  }

  has(name) {
    return this.$latest().value.some(addon => addon.name === name)
  }
}
