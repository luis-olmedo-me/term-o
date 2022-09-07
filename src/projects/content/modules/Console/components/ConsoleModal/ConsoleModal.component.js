import React from 'react'
import { ConsolePortal } from '../ConsolePortal/ConsolePortal.component'

export const ConsoleModal = ({ isOpen }) => {
  return (
    <ConsolePortal>
      {isOpen && <div style={{ color: 'white' }}>Esta vivo</div>}
    </ConsolePortal>
  )
}
