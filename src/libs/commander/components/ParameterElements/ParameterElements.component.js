import React from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'

export const ParameterElements = ({
  elements,
  pinnedElements,
  setPinnedElements,
  shouldAnimate,
  Child = Element
}) => {
  return (
    <ElementsWrapper>
      {elements.map((element, indexId) => {
        const isPinned = pinnedElements.includes(element)

        return (
          <Child
            key={`element-${indexId}`}
            element={element}
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
