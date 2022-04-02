import React, { useEffect, useState, useCallback } from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { MoreContentButton } from './CommandDom.styles'
import {
  getActionType,
  getElements,
  isElementHidden
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { ParameterElements } from '../ParameterElements/ParameterElements.component'
import { domMessages } from './CommandDom.messages'

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

  const actionType = getActionType({ props })

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

    const filterElementsBySome = (element) => {
      let validations = []

      if (hasId) validations.push((element) => Boolean(element.id))
      if (hasClass) validations.push((element) => Boolean(element.className))
      if (byId.length) {
        validations.push((element) =>
          byId.some((id) => element.id.includes(id))
        )
      }
      if (byClass.length) {
        validations.push((element) =>
          byClass.some((className) => element.className?.includes?.(className))
        )
      }
      if (byText.length) {
        validations.push((element) =>
          byText.some((text) => element.textContent?.includes?.(text))
        )
      }
      if (byStyle.length) {
        validations.push((element) =>
          byStyle.some((style) => {
            const [[styleName, styleValue]] = Object.entries(style)

            return element.style[styleName] === styleValue
          })
        )
      }
      if (byAttribute.length) {
        validations.push((element) =>
          byAttribute.some((attribute) => {
            const [[attributeName, attributeValue]] = Object.entries(attribute)

            return element.getAttribute(attributeName)?.includes(attributeValue)
          })
        )
      }

      return validations.some((validation) => validation(element))
    }

    const filterElementsByEvery = (element) => {
      let validations = []

      if (!hidden) validations.push((element) => !isElementHidden(element))

      return validations.every((validation) => validation(element))
    }

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
