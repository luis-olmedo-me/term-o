import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { PortalContext } from './Portal.contexts'

export const PortalProvider = ({ children }) => {
  const mainWrapperReference = useRef(null)
  const [mainWrapper, setMainWrapper] = useState(null)

  useEffect(
    function setReferenceForPortal() {
      setMainWrapper(mainWrapperReference.current || null)

      return () => setMainWrapper(null)
    },
    [mainWrapperReference]
  )

  return (
    <PortalContext.Provider value={mainWrapper}>
      <div ref={mainWrapperReference}>{children}</div>
    </PortalContext.Provider>
  )
}
