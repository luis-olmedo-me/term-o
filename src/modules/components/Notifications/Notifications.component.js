import { Portal } from '@src/modules/components/Portal/Portal.component'
import { Logo } from '@src/modules/icons'
import * as React from 'preact'
import {
  Description,
  Image,
  LogoWrapper,
  NotificationsWrapper,
  NotificationWrapper
} from './Notifications.styles'

export const Notifications = ({ messages }) => {
  const aliveMessages = messages.filter(message => !message.isDead)

  return (
    <Portal>
      <NotificationsWrapper>
        {messages.map(({ id, message, isDead, image }, index) => {
          const alivePosition = aliveMessages.findIndex(message => message.id === id)
          const position = alivePosition === -1 ? 0 : alivePosition

          return (
            <NotificationWrapper key={id} className={isDead ? 'dead' : ''} position={position}>
              {image ? <Image src={image} /> : <Logo Wrapper={LogoWrapper} />}

              <Description>{message}</Description>
            </NotificationWrapper>
          )
        })}
      </NotificationsWrapper>
    </Portal>
  )
}
