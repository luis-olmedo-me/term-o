import * as React from 'react'
import { useMemo } from 'react'
import { ElementWrapper } from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../../components/CommandDom/CommandDom.helpers'
import { ElementLabel } from '../../../NodeTree/components/ElementLabel/ElementLabel.component'

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
      onClick={(event) => onClick?.({ event, element })}
    >
      <ElementLabel element={element} isHidden={isHidden} />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
