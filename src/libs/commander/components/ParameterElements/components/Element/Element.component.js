import React, { useMemo } from 'react'
import {
  ElementWrapper,
  Specification,
  SelectTrigger,
  SelectOption,
  TwoDotsOptions
} from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../CommandDom/CommandDom.helpers'

const ElementWithoutContext = ({ htmlElement = {}, setHighlitedElement }) => {
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
  }

  const handleScrollIntoView = () => {
    htmlElement.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handleElementMouseEnter = () => {
    setHighlitedElement(htmlElement)
  }

  const handleElementMouseLeave = () => {
    setHighlitedElement(null)
  }

  const options = [
    { id: 'copy-option', displayText: 'Copy', onClick: handleCopy },
    {
      id: 'scroll-into-view-option',
      displayText: 'Scroll Into View',
      onClick: handleScrollIntoView
    }
  ]

  return (
    <ElementWrapper isHidden={isHidden} onClick={handleCopy}>
      {tagNameLabel}

      {specification && (
        <Specification isHidden={isHidden}>{specification}</Specification>
      )}

      <TwoDotsOptions
        ButtonTrigger={SelectTrigger}
        Option={SelectOption}
        options={options}
      />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
