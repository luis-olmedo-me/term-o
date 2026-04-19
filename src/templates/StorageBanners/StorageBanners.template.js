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

  addOrUpdate({ message, type, duration, id }) {
    const banners = this.$latest().value
    const bannerIDs = banners.map(banner => banner.id)
    const newBanner = { message, type, duration, id: id || createUUIDv4() }
    const newBanners = bannerIDs.includes(id)
      ? banners.map(banner => (banner.id === id ? newBanner : banner))
      : banners.concat(newBanner)

    this.$storageService.set(storageKeys.BANNERS, newBanners)
  }

  getByID(id) {
    return this.$latest().value.find(banner => banner.id === id)
  }

  remove(id) {
    const newBanners = this.$latest().value.filter(banner => banner.id !== id)

    this.$storageService.set(storageKeys.BANNERS, newBanners)
  }
}
