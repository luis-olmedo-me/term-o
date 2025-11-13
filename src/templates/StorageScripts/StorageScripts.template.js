import { deleteStorageValue, getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageKeys } from '@src/constants/storage.constants'
import StorageSimple from '../StorageSimple'

export class StorageScripts extends StorageSimple {
  constructor(storageService, namespace, storageValue) {
    super(storageService, namespace, storageValue)
  }

  get $value() {
    return {
      names: this.$latest().value,
      delete: this.delete.bind(this),
      add: this.add.bind(this),
      get: this.get.bind(this),
      has: this.has.bind(this)
    }
  }

  add(name, content) {
    const newScripts = this.$latest().value.concat(name)

    this.$storageService.set(storageKeys.SCRIPTS, newScripts)
    setStorageValue(this.$namespace, `script_${name}`, content)
  }

  delete(name) {
    const newScripts = this.$latest().value.filter(scriptName => scriptName !== name)

    this.$storageService.set(storageKeys.SCRIPTS, newScripts)
    deleteStorageValue(this.$namespace, `script_${name}`)
  }

  get(name) {
    const isValid = this.$latest().value.some(scriptName => scriptName === name)

    if (!isValid) return null

    return getStorageValue(this.$namespace, `script_${name}`, null)
  }

  has(name) {
    return this.$latest().value.some(scriptName => scriptName === name)
  }
}
