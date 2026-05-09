import Warning from '@src/icons/Warning.icon'

import { bannerTypes } from '@src/constants/banners.constants'
import { statusIndicators } from '@src/constants/config.constants'
import {
  banners__banner___mod_warning,
  banners__container___indicator_dot,
  banners__container___indicator_half_dot,
  banners__container___indicator_none
} from './Banners.module.scss'

export const getClassNameByBannerType = type => {
  if (type === bannerTypes.WARNING) return banners__banner___mod_warning
  return ''
}

export const getIconByBannerType = type => {
  if (type === bannerTypes.WARNING) return Warning
  return ''
}

export const getClassNameByIndicator = indicator => {
  if (indicator === statusIndicators.DOT) return banners__container___indicator_dot
  if (indicator === statusIndicators.HALF_DOT) return banners__container___indicator_half_dot
  if (indicator === statusIndicators.NONE) return banners__container___indicator_none
  return ''
}
