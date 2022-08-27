import React from 'react'
import { Portal } from 'src/modules/components/Portal/Portal.component'
import { Logo } from 'src/modules/icons/Logo.icon'
import { Description, NotificationWrapper } from './Notification.styles'

export const Notification = () => {
  return (
    <Portal>
      <NotificationWrapper>
        <Logo size={50} />

        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </Description>
      </NotificationWrapper>
    </Portal>
  )
}
