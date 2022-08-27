import React from 'react'
import { Portal } from 'src/modules/components/Portal/Portal.component'
import { NotificationWrapper } from './Notification.styles'

export const Notification = () => {
  return (
    <Portal>
      <NotificationWrapper>hola!</NotificationWrapper>
    </Portal>
  )
}
