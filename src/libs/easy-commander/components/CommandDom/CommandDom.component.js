import React, { useEffect, useState, useMemo } from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { MoreContentButton } from './CommandDom.styles'
import { getElements } from './CommandDom.helpers'
import { parameterTypes } from '../../constants/commands.constants'
import { ParameterElements } from '../ParameterElements/ParameterElements.component'
import { domMessages } from './CommandDom.messages'

export const CommandDom = ({
  props: { get, hasId, hasClass, values },
  terminal: { command, parameters, setParameters, setMessageData }
}) => {
  const [elements, setElements] = useState([])
  const [elementsShown, setElementsShown] = useState(40)

  const patterns = useMemo(() => {
    const patternToGet = get || []
    const patternsFromValues = values || []

    return [...patternToGet, ...patternsFromValues]
  }, [get])

  useEffect(
    function searchElements() {
      const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
      const defaultElements = hasDefaultElements ? parameters.value : []

      const hasFilters = hasId || hasClass
      const filterElements = (element) => {
        let validations = []

        if (hasId) validations.push((element) => Boolean(element.id))
        if (hasClass) validations.push((element) => Boolean(element.className))

        return validations.some((validation) => validation(element))
      }

      const elementsSearch = getElements({
        patterns,
        defaultElements,
        filter: hasFilters ? filterElements : null
      })

      elementsSearch.then(({ elements: newElements, error }) => {
        if (error) {
          return setMessageData({ message: error, type: parameterTypes.ERROR })
        } else if (!newElements.length) {
          return setMessageData(domMessages.noElementsFound, {
            patterns: patterns.join(', ')
          })
        }

        setElements(newElements)
        setParameters({ value: newElements, type: parameterTypes.ELEMENTS })
      })
    },
    [patterns, parameters, setMessageData]
  )

  const hasMoreElements = elements.length > elementsShown
  const limitedElements = elements.slice(0, elementsShown)

  const increaseElementsShown = () => setElementsShown(elementsShown + 40)
  const textForIncreasing = `Ver mas (${elementsShown}/${elements.length})`

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.ELEMENT}>
        <ParameterElements elements={limitedElements} />
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
