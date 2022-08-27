import React from 'react'
import { Portal } from 'src/modules/components/Portal/Portal.component'
import { Logo } from 'src/modules/icons/Logo.icon'
import { Metadata, NotificationWrapper } from './Notification.styles'

export const Notification = () => {
  return (
    <Portal>
      <NotificationWrapper>
        <Logo />

        <Metadata>
          <h3>Title</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            similique, deleniti praesentium excepturi sunt tempore ipsa
            distinctio quibusdam placeat minima culpa ex recusandae velit ad
            totam a sequi aut consectetur!
          </p>
        </Metadata>
      </NotificationWrapper>
    </Portal>
  )
}
