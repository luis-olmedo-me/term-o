import React, { useEffect, useState, useCallback } from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { MoreContentButton } from './CommandDom.styles'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements,
  isElementHidden
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { ParameterElements } from '../ParameterElements/ParameterElements.component'
import { domMessages } from './CommandDom.messages'

const divideElementsIntoPages = (elements, pageSize) => {
  const pages = []

  for (let index = 0; index < elements.length; index += pageSize) {
    pages.push(elements.slice(index, index + pageSize))
  }

  return pages
}

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
  const [elementsShown, setElementsShown] = useState(40)
  const [pageNumber, setPageNumber] = useState(1)

  const actionType = getActionType(props)

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

  const generateButtonGroupsFromPages = (pages) => {
    const buttonGroups = []

    pages.forEach((_page, index) => {
      buttonGroups.push({
        id: `page-${index + 1}`,
        text: `${index + 1}`,
        onClick: () => setPageNumber(index + 1)
      })
    })

    return buttonGroups
  }

  const elementsDividedIntoPages = divideElementsIntoPages(elements, 40)
  const currentPage = elementsDividedIntoPages[pageNumber - 1] || []
  const pagesAsButtonGroups = generateButtonGroupsFromPages(
    elementsDividedIntoPages
  )
  const hasMoreElements = elementsDividedIntoPages.length > 0

  const buttonGroups = [
    {
      id: 'go-to-previous-page',
      text: '<',
      onClick: () => setPageNumber(pageNumber - 1)
    },
    ...pagesAsButtonGroups,
    {
      id: 'go-to-next-page',
      text: '>',
      onClick: () => setPageNumber(pageNumber + 1)
    }
  ]

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper
        variant={parameterTypes.ELEMENT}
        buttonGroups={hasMoreElements ? buttonGroups : null}
      >
        <ParameterElements elements={currentPage} />
      </LogWrapper>
    </>
  )
}
