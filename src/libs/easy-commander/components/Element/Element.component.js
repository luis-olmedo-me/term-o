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
    htmlElement.style.boxShadow = '0 0 0 3px #ff0 inset'
  }

  const unhighlightElement = () => {
    htmlElement.style.boxShadow = orinalBoxShadow
  }

  return (
    <ElementWrapper
      onMouseEnter={highlightElement}
      onMouseLeave={unhighlightElement}
      isHidden={isHidden}
    >
      {htmlElement.tagName.toLowerCase()}
    </ElementWrapper>
  )
}
