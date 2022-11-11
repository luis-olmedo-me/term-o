import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Overlay } from './Overlay.component'
import { OverlayContext } from './Overlay.contexts'

export const OverlayProvider = ({ children }) => {
  const [highlitedElement, setHighlitedElement] = useState(null)

  return (
    <OverlayContext.Provider value={setHighlitedElement}>
      <Overlay highlitedElement={highlitedElement} />

      {children}
    </OverlayContext.Provider>
  )
}
