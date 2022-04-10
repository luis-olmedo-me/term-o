import React, { useState } from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'

export const ParameterElements = ({ elements }) => {
  const [pinnedElements, setPinnedElements] = useState([])

  const hasPinnedElements = Boolean(pinnedElements.length)
  const hasElements = elements.some(
    (element) => !pinnedElements.includes(element)
  )

  return (
    <>
      {hasPinnedElements && (
        <ElementsWrapper>
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

      {hasElements && (
        <ElementsWrapper>
          {elements.map((element, indexId) => {
            const isPinned = pinnedElements.includes(element)

            return (
              !isPinned && (
                <Element
                  key={`element-${indexId}`}
                  htmlElement={element}
                  setPinnedElements={setPinnedElements}
                  pinnedElements={pinnedElements}
                />
              )
            )
          })}
        </ElementsWrapper>
      )}
    </>
  )
}
