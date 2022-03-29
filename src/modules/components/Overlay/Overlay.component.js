import React, { useMemo } from 'react'
import { Portal } from '../Portal/Portal.component'
import { HighlightedElement, OverlayWrapper } from './Overlay.styles'

export const Overlay = ({ highlitedElement }) => {
  const { top, left, height, width } = useMemo(() => {
    return highlitedElement?.getBoundingClientRect() || {}
  }, [highlitedElement])

  return (
    <Portal>
      <OverlayWrapper isHighlighting={!!highlitedElement}>
        {highlitedElement && (
          <HighlightedElement style={{ top, left, height, width }} />
        )}
      </OverlayWrapper>
    </Portal>
  )
}
