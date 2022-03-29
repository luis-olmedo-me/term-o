import React from 'react'
import { Portal } from '../Portal/Portal.component'
import { OverlayWrapper } from './Overlay.styles'

export const Overlay = () => {
  return (
    <Portal>
      <OverlayWrapper />
    </Portal>
  )
}
