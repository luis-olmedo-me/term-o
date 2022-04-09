import React from 'react'
import {
  ElementsWrapper,
  PinnedElement,
  PinnedElementsWrapper
} from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'

export const ParameterElements = ({
  elements,
  setPinnedElements,
  pinnedElements
}) => {
  const hasPinnedElements = Boolean(pinnedElements.length)

  return (
    <>
      {hasPinnedElements && (
        <PinnedElementsWrapper>
          {pinnedElements.map((pinnedElement, indexId) => (
            <PinnedElement
              key={`pinned-element-${indexId}`}
              htmlElement={pinnedElement}
              setPinnedElements={setPinnedElements}
              pinnedElements={pinnedElements}
            />
          ))}
        </PinnedElementsWrapper>
      )}

      <ElementsWrapper>
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
    </>
  )
}
