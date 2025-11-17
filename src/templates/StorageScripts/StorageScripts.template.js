import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

import { deleteStorageValue, getStorageValue, setStorageValue } from '@src/browser-api/storage.api'
import { storageKeys } from '@src/constants/storage.constants'
import StorageSimple from '../StorageSimple'

export class StorageScripts extends StorageSimple {
  constructor(storageService, props) {
    super(storageService, props)
  }

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

  add(name, lastVisitTime, size, content) {
    const newScripts = this.$latest().value.concat({ name, lastVisitTime, size })

    this.$storageService.set(storageKeys.SCRIPTS, newScripts)
    setStorageValue(this.$namespace, `script_${name}`, compressToUTF16(content), false)
  }

  delete(name) {
    const newScripts = this.$latest().value.filter(script => script.name !== name)

    this.$storageService.set(storageKeys.SCRIPTS, newScripts)
    deleteStorageValue(this.$namespace, `script_${name}`)
  }

  async get(name) {
    const isValid = this.$latest().value.some(script => script.name === name)

    if (!isValid) return null

    const content = await getStorageValue(this.$namespace, `script_${name}`, null, false)

    return content && decompressFromUTF16(content)
  }

  getMetadata(name) {
    return this.$latest().value.find(script => script.name === name)
  }

  has(name) {
    return this.$latest().value.some(script => script.name === name)
  }
}
