import { storageKeys } from '@src/constants/storage.constants'
import { createUUIDv4 } from '@src/helpers/utils.helpers'
import StorageSimple from '@src/templates/StorageSimple'

export class StorageBanners extends StorageSimple {
  get $value() {
    return {
      values: this.$latest().value,
      addOrUpdate: this.addOrUpdate.bind(this),
      remove: this.remove.bind(this)
    }
  }

  addOrUpdate({ message, type, id }) {
    const banners = this.$latest().value
    const bannerIDs = banners.map(banner => banner.id)

    const isNewBanner = bannerIDs.includes(id)
    const newBanner = { message, type, id: id || createUUIDv4() }

    const newBanners = isNewBanner
      ? banners.map(banner => (banner.id === id ? newBanner : banner))
      : banners.concat(newBanner)

    const newLimitedBanners = newBanners.slice(-3)

    this.$storageService.set(storageKeys.BANNERS, newLimitedBanners)
  }

  getByID(id) {
    return this.$latest().value.find(banner => banner.id === id)
  }

  remove(id, options) {
    const { startsWith = '' } = options || {}
    const newBanners = this.$latest().value.filter(banner => {
      const isExpectedId = banner.id === id
      const matchesStart = banner.id.startsWith(startsWith)

      if (startsWith) return !isExpectedId && !matchesStart
      return !isExpectedId
    })

    this.$storageService.set(storageKeys.BANNERS, newBanners)
  }
}
