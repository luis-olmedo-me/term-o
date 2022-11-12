import * as React from 'preact'
import { useMemo } from 'preact/hooks'
import { Portal } from '../Portal/Portal.component'
import { HighlightedElement, OverlayWrapper } from './Overlay.styles'

export const Overlay = ({ highlitedElement }) => {
  const { top, left, height, width } = useMemo(() => {
    return highlitedElement?.getBoundingClientRect() || {}
  }, [highlitedElement])

  const isHighliting = Boolean(highlitedElement)

  return (
    <Portal>
      <OverlayWrapper isHighlighting={isHighliting}>
        <HighlightedElement
          className='horizontal-limit'
          isHighlighting={isHighliting}
          style={isHighliting ? { top, height } : null}
        />

        <HighlightedElement
          className='vertical-limit'
          isHighlighting={isHighliting}
          style={isHighliting ? { left, width } : null}
        />

        <HighlightedElement
          isHighlighting={isHighliting}
          className='box'
          style={isHighliting ? { top, left, width, height } : null}
        />
      </OverlayWrapper>
    </Portal>
  )
}
