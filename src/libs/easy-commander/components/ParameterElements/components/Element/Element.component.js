import React, { useMemo } from 'react'
import { Tooltip } from 'modules/components/Tooltip/Tooltip.component'
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

  return (
    <Tooltip
      side={'bottom'}
      contentTriggered={
        <>
          <p>id: {htmlElement.id}</p>
          <p>class: {htmlElement.className}</p>
        </>
      }
      content={
        <ElementWrapper
          onMouseEnter={highlightElement}
          onMouseLeave={unhighlightElement}
          isHidden={isHidden}
        >
          {htmlElement.tagName.toLowerCase()}
        </ElementWrapper>
      }
    />
  )
}
