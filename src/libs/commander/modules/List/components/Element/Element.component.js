import * as React from 'react'
import { useMemo, useState, useRef, useEffect } from 'react'
import { ElementWrapper, FloatingActions } from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../../components/CommandDom/CommandDom.helpers'
import { createXPathFromElement } from './Element.helpers'
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

  const actionsRef = useRef(null)
  const [wrapperPaddingRight, setWrapperPaddingRight] = useState(10)

  useEffect(function checkWrapperPadding() {
    const reference = actionsRef.current

    const updateData = () => {
      const { offsetWidth } = reference
      const paddingRight = offsetWidth + 10

      setWrapperPaddingRight(paddingRight)
    }

    const obsever = new ResizeObserver(updateData)

    obsever.observe(reference)

    return () => obsever.unobserve(reference)
  }, [])

  const isHidden = isElementHidden(element, { height, width })

  const handleScrollIntoView = () => {
    element.scrollIntoView({
      behavior: 'smooth'
    })
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

  const actions = [
    {
      id: 'group',
      items: [
        {
          id: 'scroll-into-view-option',
          title: 'Scroll Into View',
          onClick: handleScrollIntoView,
          Component: '👁️'
        },
        {
          id: 'copy-xpath-option',
          title: 'Copy XPath',
          onClick: handleCopyXPath,
          Component: '📋'
        }
      ]
    }
  ]

  return (
    <ElementWrapper
      onMouseEnter={!isHidden ? highlightElement : null}
      onMouseLeave={!isHidden ? unhighlightElement : null}
      className={`${className} ${variant}`}
      shouldAnimate={shouldAnimate}
      onClick={(event) => onClick?.({ event, element })}
      paddingRight={wrapperPaddingRight}
    >
      <ElementLabel element={element} isHidden={isHidden} />

      <FloatingActions wrapperRef={actionsRef} actions={actions} />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
