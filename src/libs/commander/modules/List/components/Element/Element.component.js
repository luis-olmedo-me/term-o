import { withOverlayContext } from '@modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '@src/helpers/dom.helpers'
import * as React from 'preact'
import { useMemo } from 'preact/hooks'
import { ElementLabel } from '../../../NodeTree/components/ElementLabel/ElementLabel.component'
import { ElementWrapper } from './Element.styles'

const ElementWithoutContext = ({
  element = {},
  setHighlitedElement,
  className = '',
  variant = '',
  shouldAnimate = false,
  onClick
}) => {
  const { height, width } = useMemo(() => {
    return element.getBoundingClientRect() || {}
  }, [element])

  const isHidden = isElementHidden(element, { height, width })

  const highlightElement = () => {
    setHighlitedElement(element)
  }

  const unhighlightElement = () => {
    setHighlitedElement(null)
  }

  return (
    <ElementWrapper
      onMouseEnter={!isHidden ? highlightElement : null}
      onMouseLeave={!isHidden ? unhighlightElement : null}
      className={`${className} ${variant}`}
      shouldAnimate={shouldAnimate}
      onClick={event => onClick?.({ event, element })}
    >
      <ElementLabel element={element} isHidden={isHidden} />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
