import useStorage from '@src/hooks/useStorage'

import { storageKeys } from '@src/constants/storage.constants'
import { useEffect } from 'preact/hooks'
import { getClassNameByBannerType, getSymbolByBannerType } from './Banners.helpers'
import { banners__banner } from './Banners.module.scss'

export const Banners = () => {
  const [banners] = useStorage({ key: storageKeys.BANNERS })

  useEffect(
    function removeBanners() {
      const bannersByTimer = Object.groupBy(banners.values, banner => banner.duration)
      const timeoutIds = Object.entries(bannersByTimer).map(([duration, items]) => {
        const durationMs = Number(duration)

        return setTimeout(() => items.forEach(item => banners.remove(item.id)), durationMs * 100)
      })

      return () => timeoutIds.forEach(clearTimeout)
    },
    [banners.values]
  )

  const hasBanners = banners.values.length > 0

  return (
    hasBanners && (
      <div>
        {banners.values.map(({ id, message, type }) => {
          const classNameByType = getClassNameByBannerType(type)
          const symbolByType = getSymbolByBannerType(type)

          return (
            <p key={id} className={`${banners__banner} ${classNameByType}`}>
              {`${symbolByType} ${message}`}
            </p>
          )
        })}
      </div>
    )
  )
}
