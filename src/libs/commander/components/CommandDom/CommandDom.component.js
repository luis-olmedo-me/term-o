import React, { useEffect, useState, useCallback } from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { ParameterElements } from '../ParameterElements/ParameterElements.component'
import { domMessages } from './CommandDom.messages'
import { usePaginationGroups } from './hooks/usePaginationGroups.hook'

export const CommandDom = ({
  props,
  terminal: { command, parameters, setParameters, setMessageData }
}) => {
  const {
    get,
    hasId,
    hasClass,
    byId,
    byClass,
    byText,
    byStyle,
    byAttribute,
    hidden
  } = props

  const [elements, setElements] = useState([])

  const actionType = getActionType(props)

  const { pageData, buttonGroups } = usePaginationGroups({ elements })

  const handleGetDomElements = useCallback(() => {
    const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
    const defaultElements = hasDefaultElements ? parameters.value : []

    const hasFiltersBySome =
      hasId ||
      hasClass ||
      byId.length ||
      byClass.length ||
      byText.length ||
      byStyle.length ||
      byAttribute.length

    const hasFiltersByAll = !hidden

    const filterElementsBySome = generateFilterBySome({
      hasId,
      hasClass,
      byId,
      byClass,
      byText,
      byStyle,
      byAttribute
    })

    const filterElementsByEvery = generateFilterByEvery({ hidden })

    const elementsSearch = getElements({
      patterns: get,
      defaultElements,
      filterBySome: hasFiltersBySome ? filterElementsBySome : null,
      filterByEvery: hasFiltersByAll ? filterElementsByEvery : null
    })

    elementsSearch
      .then(({ elementsFound }) => {
        setElements(elementsFound)
        setParameters({ value: elementsFound, type: parameterTypes.ELEMENTS })
      })
      .catch(() => setMessageData(domMessages.noElementsFound))
  }, [
    get,
    hasId,
    hasClass,
    byId,
    byClass,
    byStyle,
    byAttribute,
    hidden,
    setMessageData
  ])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.GET_DOM_ELEMENTS:
          handleGetDomElements()
          break

        default:
          break
      }
    },
    [actionType, handleGetDomElements]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.ELEMENT} buttonGroups={buttonGroups}>
        <ParameterElements elements={pageData} />
      </LogWrapper>
    </>
  )
}
