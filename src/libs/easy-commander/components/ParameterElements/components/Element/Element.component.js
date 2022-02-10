import React, { useMemo, useState } from 'react'
import { Tooltip } from 'modules/components/Tooltip/Tooltip.component'
import { ElementWrapper, ElementTooltip } from './Element.styles'

export const Element = ({ htmlElement }) => {
  const [side, setSide] = useState('top')

  const orinalBoxShadow = useMemo(
    () => htmlElement.style.boxShadow,
    [htmlElement]
  )

  const isHidden =
    htmlElement.style.visibility === 'hidden' ||
    htmlElement.style.display === 'none'

  const highlightElement = (event) => {
    htmlElement.style.boxShadow = '0 0 0 3px #e5b567 inset'

    const distanceFromTop = event.target.getBoundingClientRect().top
    const distanceFromBottom = window.screen.height - distanceFromTop

    setSide(distanceFromTop > distanceFromBottom ? 'top' : 'bottom')
  }

  const unhighlightElement = () => {
    htmlElement.style.boxShadow = orinalBoxShadow
  }

  const { id, className } = htmlElement

  const idLabel = `id: ${id}`
  const classNameLabel = `class: ${className}`

  return (
    <Tooltip
      side={side}
      contentTriggered={
        <div>
          {id && <ElementTooltip>{idLabel}</ElementTooltip>}
          {className && <ElementTooltip>{classNameLabel}</ElementTooltip>}
        </div>
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
