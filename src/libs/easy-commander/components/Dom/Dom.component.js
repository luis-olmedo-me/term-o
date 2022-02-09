import React, { useEffect, useState, useMemo } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper, MoreContentButton } from './Dom.styles'
import { getElements } from '../../easyCommander.promises'
import { parameterTypes } from '../../easyCommander.constants'

export const Dom = ({
  id,
  get,
  values,
  command,
  parameters,
  setParameters
}) => {
  const [elements, setElements] = useState([])
  const [elementsShown, setElementsShown] = useState(80)

  const patterns = useMemo(() => {
    const patternToGet = get || []
    const patternsFromValues = values || []

    return [...patternToGet, ...patternsFromValues]
  }, [get, command])

  useEffect(
    function searchElements() {
      const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
      const defaultElements = hasDefaultElements ? parameters.value : []

      const elementsSearch = getElements({ patterns, defaultElements })

      elementsSearch.then((newElements) => {
        setElements(newElements)
        setParameters({ value: newElements, type: parameterTypes.ELEMENTS })
      })
    },
    [patterns, parameters]
  )

  const hasMoreElements = elements.length > elementsShown
  const limitedElements = elements.slice(0, elementsShown)

  const increaseElementsShown = () => setElementsShown(elementsShown + 80)
  const textForIncreasing = `Ver mas (${elementsShown}/${elements.length})`

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.ELEMENT}>
        <ElementsWrapper>
          {limitedElements.map((element, indexId) => {
            return <Element key={indexId} htmlElement={element} />
          })}
        </ElementsWrapper>
      </LogWrapper>

      {hasMoreElements && (
        <LogWrapper variant={parameterTypes.BUTTON_GROUP}>
          <MoreContentButton onClick={increaseElementsShown}>
            {textForIncreasing}
          </MoreContentButton>
        </LogWrapper>
      )}
    </>
  )
}
