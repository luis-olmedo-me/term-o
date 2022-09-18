import React from 'react'
import { ListWrapper } from './List.styles'
import { Element } from './components/Element/Element.component'

export const List = ({
  elements,
  pinnedElements,
  setPinnedElements,
  shouldAnimate,
  Child = Element,
  customProps = {}
}) => {
  return (
    <ListWrapper>
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
            {...customProps}
          />
        )
      })}
    </ListWrapper>
  )
}
