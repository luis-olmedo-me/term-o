import React from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'

export const ParameterElements = ({
  elements,
  setPinnedElements,
  pinnedElements
}) => {
  return (
    <ElementsWrapper>
      {pinnedElements.map((pinnedElement, indexId) => (
        <Element
          key={`pinned-element-${indexId}`}
          htmlElement={pinnedElement}
          setPinnedElements={setPinnedElements}
          pinnedElements={pinnedElements}
        />
      ))}

      {elements.map((element, indexId) => {
        return (
          <Element
            key={`element-${indexId}`}
            htmlElement={element}
            setPinnedElements={setPinnedElements}
            pinnedElements={pinnedElements}
          />
        )
      })}
    </ElementsWrapper>
  )
}
