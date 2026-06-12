import Bell from '@src/svg/bell.svg?raw'
import Exclamation from '@src/svg/exclamation.svg?raw'
import Info from '@src/svg/info.svg?raw'
import Tick from '@src/svg/tick.svg?raw'

import { notificationIcons } from '@src/constants/notifications.constants'
import { getPaintedFragments } from '@src/helpers/paint.helpers'

export const buildHtmlTextContent = value => {
  const fragments = getPaintedFragments(value, false)

  return fragments.reduce((result, fragment) => {
    return `${result}<span data-bgcolor="${fragment.bgcolor}" data-color="${fragment.color}">${fragment.value}</span>`
  }, '')
}

export const getIconSvgByNotificationIcon = notificationIcon => {
  if (notificationIcon === notificationIcons.SUCCESS) return Tick
  if (notificationIcon === notificationIcons.ERROR) return Exclamation
  if (notificationIcon === notificationIcons.INFO) return Info
  return Bell
}
