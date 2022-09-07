import React from 'react'
import { createPortal } from 'react-dom'
import { ConsolePortalContext } from './ConsolePortal.contexts'

export const ConsolePortal = ({ children }) => {
  return (
    <ConsolePortalContext.Consumer>
      {({ root }) => root && createPortal(children, root)}
    </ConsolePortalContext.Consumer>
  )
}
