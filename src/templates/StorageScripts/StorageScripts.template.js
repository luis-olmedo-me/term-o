import StorageSimple from '../StorageSimple'

export class StorageScripts extends StorageSimple {
  constructor(storageService, namespace, storageValue) {
    super(storageService, namespace, storageValue)
  }

  get $value() {
    return this.$latest().value
  }

  $update(storageValue) {
    if (storageValue.version === this.$storageValue.version) return

    this.$storageValue = storageValue
  }

  $latest() {
    return this.$storageValue
  }
}
