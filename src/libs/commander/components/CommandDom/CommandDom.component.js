import React, { useEffect, useState, useCallback } from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements,
  lookupElementByXPath
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { ParameterElements } from '../ParameterElements/ParameterElements.component'
import { domMessages } from './CommandDom.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { insertParams } from '../../commander.helpers'

export const CommandDom = ({
  props,
  terminal: { command, setParams, setMessageData, finish },
  id
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
    hidden,
    byXpath
  } = props

  const [elements, setElements] = useState([])

  const actionType = getActionType(props)

  const { pageData, buttonGroups } = usePaginationGroups({
    items: elements,
    maxItems: 30
  })

  const handleGetDomElements = useCallback(() => {
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
      xpaths: byXpath,
      filterBySome: hasFiltersBySome ? filterElementsBySome : null,
      filterByEvery: hasFiltersByAll ? filterElementsByEvery : null
    })

    elementsSearch
      .then(({ elementsFound }) => {
        const elementsAsParam = {
          id,
          value: elementsFound,
          type: parameterTypes.ELEMENTS
        }

        setElements(elementsFound)
        setParams(insertParams(id, elementsAsParam))
        finish()
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
    byXpath,
    setMessageData,
    setParams,
    finish,
    id
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
