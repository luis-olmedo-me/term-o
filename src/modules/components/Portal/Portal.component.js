import ReactDOM from 'react-dom'
import React from 'react'
import { PortalContext } from './Portal.contexts'

export const Portal = ({ children }) => {
  return (
    <PortalContext.Consumer>
      {(root) => root && ReactDOM.createPortal(children, root)}
    </PortalContext.Consumer>
  )
}
