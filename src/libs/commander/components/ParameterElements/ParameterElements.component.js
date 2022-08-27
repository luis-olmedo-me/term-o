import React, { useState } from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'

export const ParameterElements = ({
  elements,
  pinnedElements,
  setPinnedElements,
  shouldAnimate
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
            shouldAnimate={shouldAnimate}
          />
        )
      })}
    </ElementsWrapper>
  )
}
