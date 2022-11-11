import * as React from 'preact'
import { OverlayContext } from './Overlay.contexts'

export const withOverlayContext = (Component) => {
  return (props) => (
    <OverlayContext.Consumer>
      {(setHighlitedElement) => (
        <Component
          {...props}
          setHighlitedElement={setHighlitedElement}
        ></Component>
      )}
    </OverlayContext.Consumer>
  )
}
