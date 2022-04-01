import React, { useMemo } from 'react'
import { ElementWrapper, Specification } from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'

const ElementWithoutContext = ({ htmlElement = {}, setHighlitedElement }) => {
  const { height, width } = useMemo(() => {
    return htmlElement.getBoundingClientRect() || {}
  }, [htmlElement])

  const isHidden =
    htmlElement.style.visibility === 'hidden' ||
    htmlElement.style.display === 'none' ||
    height === 0 ||
    width === 0

  const { id, className } = htmlElement

  const idLabel = id && `#${id}`
  const classNameLabel = className && `.${className.replaceAll?.(/\s/g, '.')}`
  const tagNameLabel = htmlElement.tagName.toLowerCase()

  const specification = idLabel || classNameLabel || ''

  const handleElementClick = () => {
    navigator.clipboard.writeText(`${tagNameLabel}${specification}`)
  }

  const handleElementMouseEnter = () => {
    setHighlitedElement(htmlElement)
  }

  const handleElementMouseLeave = () => {
    setHighlitedElement(null)
  }

  return (
    <ElementWrapper
      onMouseEnter={isHidden ? null : handleElementMouseEnter}
      onMouseLeave={isHidden ? null : handleElementMouseLeave}
      isHidden={isHidden}
      onClick={handleElementClick}
    >
      {tagNameLabel}

      {specification && (
        <Specification isHidden={isHidden}>{specification}</Specification>
      )}
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
