import React, { useEffect, useState, useMemo } from 'react'
import { Element } from '../Element/Element.component'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { ElementsWrapper, MoreContentButton } from './Dom.styles'
import { getElements } from '../../easyCommander.promises'

export const Dom = ({
  id,
  get,
  values,
  command,
  carriedValue,
  setCarriedValue
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
      const defaultElements =
        carriedValue?.type === 'elements' ? carriedValue.value : []

      const elementsSearch = getElements({ patterns, defaultElements })

      elementsSearch.then((newElements) => {
        setElements(newElements)
        setCarriedValue({ value: newElements, type: 'elements' })
      })
    },
    [patterns, carriedValue]
  )

  const hasMoreElements = elements.length > elementsShown
  const limitedElements = elements.slice(0, elementsShown)

  const increaseElementsShown = () => setElementsShown(elementsShown + 80)
  const textForIncreasing = `Ver mas (${elementsShown}/${elements.length})`

  return (
    <>
      <LogWrapper variant='command'>{command}</LogWrapper>

      <LogWrapper variant='element'>
        <ElementsWrapper>
          {limitedElements.map((element, indexId) => {
            return <Element key={indexId} htmlElement={element} />
          })}
        </ElementsWrapper>
      </LogWrapper>

      {hasMoreElements && (
        <LogWrapper variant='button-group'>
          <MoreContentButton onClick={increaseElementsShown}>
            {textForIncreasing}
          </MoreContentButton>
        </LogWrapper>
      )}
    </>
  )
}
