import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
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
