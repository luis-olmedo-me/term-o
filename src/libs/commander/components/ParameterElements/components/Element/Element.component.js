import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import {
  ElementWrapper,
  SelectTrigger,
  SelectOption,
  ThreeDotsOptions,
  SelectOptionsWrapper
} from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../CommandDom/CommandDom.helpers'
import { createXPathFromElement } from './Element.helpers'
import { ElementLabel } from '../../../../modules/NodeTree/components/ElementLabel/ElementLabel.component'

const ElementWithoutContext = ({
  element = {},
  setHighlitedElement,
  setPinnedElements,
  pinnedElements,
  className = '',
  variant = '',
  shouldAnimate = false
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [wrapperPaddingRight, setWrapperPaddingRight] = useState(10)
  const triggerRef = useRef(null)

  const closeSelect = useCallback(() => {
    setIsSelectOpen(false)
  }, [])

  useEffect(function checkWrapperPadding() {
    const { offsetWidth } = triggerRef.current
    const paddingRight = offsetWidth + 10

    setWrapperPaddingRight(paddingRight)
  }, [])

  const { height, width } = useMemo(() => {
    return element.getBoundingClientRect() || {}
  }, [element])

  const isHidden = isElementHidden(element, { height, width })

  const { id, classList } = element

  const idLabel = id && `#${id}`
  const classNameLabel = !!classList.length && `.${[...classList].join('.')}`
  const tagNameLabel = element.tagName.toLowerCase()

  const specification = idLabel || classNameLabel || ''

  const handleCopy = () => {
    navigator.clipboard.writeText(`${tagNameLabel}${specification}`)

    closeSelect()
  }

  const handleScrollIntoView = () => {
    element.scrollIntoView({
      behavior: 'smooth'
    })

    closeSelect()
  }

  const handlePinElement = () => {
    setPinnedElements([...pinnedElements, element])

    closeSelect()
  }

  const handleUnpinElement = () => {
    setPinnedElements(
      pinnedElements.filter((pinnedElement) => pinnedElement !== element)
    )

    closeSelect()
  }

  const handleCopyXPath = () => {
    const xPath = createXPathFromElement(element)

    navigator.clipboard.writeText(xPath.includes(' ') ? `"${xPath}"` : xPath)

    closeSelect()
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
    { id: 'copy-option', displayText: 'Copy', onClick: handleCopy },
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
      paddingRight={wrapperPaddingRight}
      className={`${className} ${variant}`}
      shouldAnimate={shouldAnimate}
    >
      <ElementLabel element={element} isHidden={isHidden} />

      <ThreeDotsOptions
        isOpen={isSelectOpen}
        handleClickOutside={closeSelect}
        handleOpenSelect={() => setIsSelectOpen(true)}
        handleOnMouseEnter={unhighlightElement}
        ButtonTrigger={SelectTrigger}
        OptionsWrapper={SelectOptionsWrapper}
        Option={SelectOption}
        options={options}
        triggerRef={triggerRef}
      />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
