import React from 'react'
import { Portal } from 'src/modules/components/Portal/Portal.component'
import { Logo } from 'src/modules/icons/Logo.icon'
import {
  Description,
  NotificationWrapper,
  LogoWrapper,
  NotificationsWrapper
} from './Notifications.styles'

export const Notifications = ({ messages }) => {
  return (
    <Portal>
      <NotificationsWrapper>
        {messages.map(({ id, message, isDead }) => {
          return (
            <NotificationWrapper key={id} isDead={isDead}>
              <Logo Wrapper={LogoWrapper} />

              <Description>{message}</Description>
            </NotificationWrapper>
          )
        })}
      </NotificationsWrapper>
    </Portal>
  )
}
