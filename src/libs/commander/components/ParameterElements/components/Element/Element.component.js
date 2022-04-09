import React, { useMemo, useState, useCallback, useRef } from 'react'
import {
  ElementWrapper,
  Specification,
  SelectTrigger,
  SelectOption,
  ThreeDotsOptions
} from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../CommandDom/CommandDom.helpers'
import { onScrollEnd } from 'src/helpers/event.helpers.js'

const ElementWithoutContext = ({ htmlElement = {}, setHighlitedElement }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const triggerRef = useRef(null)

  const closeSelect = useCallback(() => {
    setIsSelectOpen(false)
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

    onScrollEnd(() => {
      highlightElement()

      setTimeout(unhighlightElement, 1000)
    })

    closeSelect()
  }

  const highlightElement = () => {
    setHighlitedElement(htmlElement)
  }

  const unhighlightElement = () => {
    setHighlitedElement(null)
  }

  const options = [
    { id: 'copy-option', displayText: 'Copy', onClick: handleCopy },
    {
      id: 'scroll-into-view-option',
      displayText: 'Scroll Into View',
      onClick: handleScrollIntoView,
      disabled: isHidden
    }
  ]

  const triggerWidth = triggerRef.current?.clientWidth || 0

  return (
    <ElementWrapper
      isHidden={isHidden}
      onMouseEnter={!isHidden ? highlightElement : null}
      onMouseLeave={!isHidden ? unhighlightElement : null}
      paddingRight={triggerWidth + 10}
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
        Option={SelectOption}
        options={options}
        triggerRef={triggerRef}
      />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
