import React, { useMemo } from 'react'
import { ElementWrapper, Specification } from './Element.styles'
import { OverlayContext } from 'modules/components/Overlay/Overlay.contexts'

export const Element = ({ htmlElement = {} }) => {
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

  return (
    <OverlayContext.Consumer>
      {(setHighlitedElement) => {
        return (
          <ElementWrapper
            onMouseEnter={() => setHighlitedElement(htmlElement)}
            onMouseLeave={() => setHighlitedElement(null)}
            isHidden={isHidden}
            onClick={handleElementClick}
          >
            {tagNameLabel}

            {specification && (
              <Specification isHidden={isHidden}>{specification}</Specification>
            )}
          </ElementWrapper>
        )
      }}
    </OverlayContext.Consumer>
  )
}
