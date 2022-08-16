import React, { useState } from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'

export const ParameterElements = ({
  elements,
  pinnedElements,
  setPinnedElements
}) => {
  return (
    <ElementsWrapper>
      {elements.map((element, indexId) => {
        const isPinned = pinnedElements.includes(element)

        return (
          <Element
            key={`element-${indexId}`}
            htmlElement={element}
            setPinnedElements={setPinnedElements}
            pinnedElements={pinnedElements}
            variant={isPinned ? 'pinned' : 'default'}
          />
        )
      })}
    </ElementsWrapper>
  )
}
