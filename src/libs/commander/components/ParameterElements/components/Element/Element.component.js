import React, { useMemo, useState } from 'react'
import { ElementWrapper, Specification } from './Element.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../CommandDom/CommandDom.helpers'
import { Select } from 'modules/components/Select/Select.component'

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
    <ElementWrapper isHidden={isHidden} onClick={handleElementClick}>
      {tagNameLabel}

      {specification && (
        <Specification isHidden={isHidden}>{specification}</Specification>
      )}

      <Select />
    </ElementWrapper>
  )
}

export const Element = withOverlayContext(ElementWithoutContext)
