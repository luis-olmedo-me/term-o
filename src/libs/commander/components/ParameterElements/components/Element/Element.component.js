import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import {
  ElementWrapper,
  Specification,
  SelectTrigger,
  SelectOption,
  ThreeDotsOptions,
  SelectOptionsWrapper
} from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../CommandDom/CommandDom.helpers'
import { createXPathFromElement } from './Element.helpers'

const ElementWithoutContext = ({
  htmlElement = {},
  setHighlitedElement,
  setPinnedElements,
  pinnedElements,
  className = '',
  variant = ''
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
    return htmlElement.getBoundingClientRect() || {}
  }, [htmlElement])

  const isHidden = isElementHidden(htmlElement, { height, width })

  const { id, classList } = htmlElement

  const idLabel = id && `#${id}`
  const classNameLabel = !!classList.length && `.${[...classList].join('.')}`
  const tagNameLabel = htmlElement.tagName.toLowerCase()

  const specification = idLabel || classNameLabel || ''

  const handleCopy = () => {
    navigator.clipboard.writeText(`${tagNameLabel}${specification}`)

    closeSelect()
  }

  const handleScrollIntoView = () => {
    htmlElement.scrollIntoView({
      behavior: 'smooth'
    })

    closeSelect()
  }

  const handlePinElement = () => {
    setPinnedElements([...pinnedElements, htmlElement])

    closeSelect()
  }

  const handleUnpinElement = () => {
    setPinnedElements(
      pinnedElements.filter((element) => element !== htmlElement)
    )

    closeSelect()
  }

  const handleCopyXPath = () => {
    const xPath = createXPathFromElement(htmlElement)

    navigator.clipboard.writeText(xPath)

    closeSelect()
  }

  const highlightElement = () => {
    setHighlitedElement(htmlElement)
  }

  const unhighlightElement = () => {
    setHighlitedElement(null)
  }

  const isElementPinned = pinnedElements.includes(htmlElement)

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
      isHidden={isHidden}
      onMouseEnter={!isHidden ? highlightElement : null}
      onMouseLeave={!isHidden ? unhighlightElement : null}
      paddingRight={wrapperPaddingRight}
      className={`${className} ${variant}`}
    >
      {tagNameLabel}

      {specification && (
        <Specification isHidden={isHidden}>{specification}</Specification>
      )}

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
