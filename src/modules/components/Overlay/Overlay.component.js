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
        <HighlightedElement
          className='horizontal-limit'
          isHighlighting={!!highlitedElement}
          style={highlitedElement ? { top, height } : null}
        />

        <HighlightedElement
          className='vertical-limit'
          isHighlighting={!!highlitedElement}
          style={highlitedElement ? { left, width } : null}
        />

        <HighlightedElement
          isHighlighting={!!highlitedElement}
          className='box'
          style={highlitedElement ? { top, left, width, height } : null}
        />
      </OverlayWrapper>
    </Portal>
  )
}
