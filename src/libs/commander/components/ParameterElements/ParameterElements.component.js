import React from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
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
        <ElementsWrapper className='pinned'>
          {pinnedElements.map((pinnedElement, indexId) => (
            <Element
              key={`pinned-element-${indexId}`}
              htmlElement={pinnedElement}
              setPinnedElements={setPinnedElements}
              pinnedElements={pinnedElements}
              variant='pinned'
            />
          ))}
        </ElementsWrapper>
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
