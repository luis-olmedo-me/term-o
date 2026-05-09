import useStorage from '@src/hooks/useStorage'

import { iconSizes } from '@src/constants/icon.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { useEffect } from 'preact/hooks'
import {
  getClassNameByBannerType,
  getClassNameByIndicator,
  getIconByBannerType
} from './Banners.helpers'
import { banners__banner, banners__container } from './Banners.module.scss'

const BANNER_DURATION = 5_000

export const Banners = ({ statusIndicator }) => {
  const [banners] = useStorage({ key: storageKeys.BANNERS })

  useEffect(
    function removeBanners() {
      const timeoutIds = banners.values.map(
        banner => setTimeout(() => banners.remove(banner.id)),
        BANNER_DURATION
      )

      return () => timeoutIds.forEach(clearTimeout)
    },
    [banners.values]
  )

  const hasBanners = banners.values.length > 0
  const classByIndicator = getClassNameByIndicator(statusIndicator)

  return (
    hasBanners && (
      <div className={`${banners__container} ${classByIndicator}`}>
        {banners.values.map(({ id, message, type }) => {
          const classNameByType = getClassNameByBannerType(type)
          const IconByType = getIconByBannerType(type)

          return (
            <p
              key={id}
              className={`${banners__banner} ${classNameByType}`}
              onClick={() => banners.remove(id)}
            >
              <IconByType size={iconSizes.XXS} />

              <span>{message}</span>
            </p>
          )
        })}
      </div>
    )
  )
}

Banners.propTypes = {
  statusIndicator: String
}
