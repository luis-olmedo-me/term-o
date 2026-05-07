export class StorageSimple {
  constructor(storageService, { key, json, namespace, storageValue }) {
    this.$storageService = storageService
    this.$key = key
    this.$json = json
    this.$namespace = namespace
    this.$storageValue = storageValue
  }

  get $value() {
    return this.$latest().value
  }

  $update(storageValue) {
    // FIXME: Delete after 0.9.4 realese
    const isOldUpdateScheme = Boolean(this.$storageValue.version)
    const isDefault = this.$storageValue.updatedAt === null

    if (!isOldUpdateScheme || !isDefault) {
      const currentUpdatedAt = new Date(this.$storageValue.updatedAt)
      const newUpdatedAt = new Date(storageValue.updatedAt)
      const isNewUpdate = newUpdatedAt >= currentUpdatedAt
      const hasInvalidMeasures = isNaN(currentUpdatedAt.getTime()) || isNaN(newUpdatedAt.getTime())

      if (!isNewUpdate && hasInvalidMeasures) return null
    }

    return (this.$storageValue = this.$interceptUpdate(storageValue))
  }

  $latest() {
    return this.$storageValue
  }

  $interceptUpdate(newStorageValue) {
    return newStorageValue
  }
}
