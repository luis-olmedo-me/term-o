import React, { useEffect, useState } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper, MoreContentButton } from './Dom.styles'

export const Dom = ({ id, get = [], values, command }) => {
  const [elements, setElements] = useState([])
  const [elementsShown, setElementsShown] = useState(80)

  useEffect(
    function searchElements() {
      const newElements = get.reduce((allElements, pattern) => {
        const foundElements = pattern
          ? window.document.querySelectorAll(pattern)
          : []

        return [...allElements, ...foundElements]
      }, [])

      setElements(newElements)
    },
    [get]
  )

  const hasMoreElements = elements.length > elementsShown
  const limitedElements = elements.slice(0, elementsShown)

  const increaseElementsShown = () => setElementsShown(elementsShown + 80)
  const textForIncreasing = `Ver mas (${elementsShown}/${elements.length})`

  return (
    <div>
      <LogWrapper variant='command'>{command}</LogWrapper>

      <LogWrapper variant='element'>
        <ElementsWrapper>
          {limitedElements.map((element, indexId) => {
            return <Element key={indexId} htmlElement={element} />
          })}
        </ElementsWrapper>

        {hasMoreElements && (
          <MoreContentButton onClick={increaseElementsShown}>
            {textForIncreasing}
          </MoreContentButton>
        )}
      </LogWrapper>
    </div>
  )
}
