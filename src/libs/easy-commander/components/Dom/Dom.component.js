import React, { useEffect, useState } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper } from './Dom.styles'

export const Dom = ({ id, get = [], values, command }) => {
  const [elements, setElements] = useState([])

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

  return (
    <div>
      <LogWrapper variant='command'>{command}</LogWrapper>
      <LogWrapper variant='element'>
        <ElementsWrapper>
          {elements.map((element, indexId) => {
            return <Element key={indexId} htmlElement={element} />
          })}
        </ElementsWrapper>
      </LogWrapper>
    </div>
  )
}
