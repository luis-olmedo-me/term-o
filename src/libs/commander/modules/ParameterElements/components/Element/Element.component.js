import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import {
  ElementWrapper,
  SelectTrigger,
  SelectOption,
  ThreeDotsOptions,
  SelectOptionsWrapper
} from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../../components/CommandDom/CommandDom.helpers'
import { createXPathFromElement } from './Element.helpers'
import { ElementLabel } from '../../../NodeTree/components/ElementLabel/ElementLabel.component'

const ElementWithoutContext = ({
  element = {},
  setHighlitedElement,
  setPinnedElements,
  pinnedElements,
  className = '',
  variant = '',
  shouldAnimate = false,
  onClick
}) => {
  const { height, width } = useMemo(() => {
    return element.getBoundingClientRect() || {}
  }, [element])

  const isHidden = isElementHidden(element, { height, width })

  const handleScrollIntoView = () => {
    element.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handlePinElement = () => {
    setPinnedElements([...pinnedElements, element])
  }

  const handleUnpinElement = () => {
    setPinnedElements(
      pinnedElements.filter((pinnedElement) => pinnedElement !== element)
    )
  }

  const handleCopyXPath = () => {
    const xPath = createXPathFromElement(element)

    navigator.clipboard.writeText(xPath.includes(' ') ? `"${xPath}"` : xPath)
  }

  const highlightElement = () => {
    setHighlitedElement(element)
  }

  const unhighlightElement = () => {
    setHighlitedElement(null)
  }

  const isElementPinned = pinnedElements.includes(element)

  const options = [
    {
      id: isElementPinned ? 'unpin-element-option' : 'pin-element-option',
      displayText: isElementPinned ? 'Unpin Element' : 'Pin Element',
      onClick: isElementPinned ? handleUnpinElement : handlePinElement
    },
    {
      id: 'scroll-into-view-option',
      displayText: 'Scroll Into View',
      onClick: handleScrollIntoView,
      disabled: isHidden
    },
    {
      id: 'copy-xpath-option',
      displayText: 'Copy XPath',
      onClick: handleCopyXPath
    }
  ]

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
