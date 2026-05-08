import { bannerTypes } from '@src/constants/banners.constants'
import { banners__banner___mod_warning } from './Banners.module.scss'

export const getClassNameByBannerType = type => {
  if (type === bannerTypes.WARNING) return banners__banner___mod_warning
  return ''
}

export const getSymbolByBannerType = type => {
  if (type === bannerTypes.WARNING) return '⚠'
  return ''
}
