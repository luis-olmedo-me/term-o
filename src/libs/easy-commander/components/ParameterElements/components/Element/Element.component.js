import React, { useMemo, useRef } from 'react'
import { Tooltip } from 'modules/components/Tooltip/Tooltip.component'
import { ElementWrapper, ElementTooltip } from './Element.styles'

export const Element = ({ htmlElement }) => {
  const tooltipContentRef = useRef(null)

  const orinalBoxShadow = useMemo(
    () => htmlElement.style.boxShadow,
    [htmlElement]
  )

  const isHidden =
    htmlElement.style.visibility === 'hidden' ||
    htmlElement.style.display === 'none'

  const highlightElement = () => {
    htmlElement.style.boxShadow = '0 0 0 3px #e5b567 inset'

    const consoleLogsElement = document.getElementById('term-o-console-logs')
    console.log('consoleLogsElement', consoleLogsElement)
    console.log('tooltipContentRef', tooltipContentRef)
  }

  const unhighlightElement = () => {
    htmlElement.style.boxShadow = orinalBoxShadow
  }

  const { id, className } = htmlElement

  const idLabel = `id: ${id}`
  const classNameLabel = `class: ${className}`

  return (
    <Tooltip
      side={'bottom'}
      contentTriggered={
        <div ref={tooltipContentRef}>
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
