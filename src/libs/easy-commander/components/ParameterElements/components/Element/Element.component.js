import React, { useMemo } from 'react'
import { ElementWrapper } from './Element.styles'

export const Element = ({ htmlElement }) => {
  const orinalBoxShadow = useMemo(
    () => htmlElement.style.boxShadow,
    [htmlElement]
  )

  const isHidden =
    htmlElement.style.visibility === 'hidden' ||
    htmlElement.style.display === 'none'

  const highlightElement = () => {
    htmlElement.style.boxShadow = '0 0 0 3px #e5b567 inset'
  }

  const unhighlightElement = () => {
    htmlElement.style.boxShadow = orinalBoxShadow
  }

  const { id, className } = htmlElement

  const idLabel = id && `#${id}`
  const classNameLabel = className && `.${className.replaceAll?.(/\s/g, '.')}`
  const tagNameLabel = htmlElement.tagName.toLowerCase()
  const elementLabel = `${tagNameLabel}${idLabel || classNameLabel}`

  return (
    <ElementWrapper
      onMouseEnter={highlightElement}
      onMouseLeave={unhighlightElement}
      isHidden={isHidden}
      onClick={() => navigator.clipboard.writeText(elementLabel)}
    >
      {elementLabel}
    </ElementWrapper>
  )
}
