import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import {
  Log,
  AttributeEditionLog,
  useMessageLog,
  usePaginationActions,
  useViews
} from '../../modules/Log'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements,
  getParentsOfElements
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { List, Element, StyleSheet } from '../../modules/List'
import { domMessages } from './CommandDom.messages'
import { insertParams } from '../../commander.helpers'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { getStylesFrom } from '../CommandCss/CommandCss.helpers'
import { domViewIds, domViews } from './CommandDom.constants'

const CommandDomWithoutContext = ({
  props,
  terminal: { command, setParams, finish },
  id,
  setHighlitedElement
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
    byXpath,
    byParentLevel,
    getParent
  } = props

  const [elements, setElements] = useState([])
  const [selectedElements, setSelectedElements] = useState([])
  const [editingElement, setEditingElement] = useState(null)
  const [sheets, setSheets] = useState(null)

  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: elements,
    maxItems: 10
  })
  const { viewActions, itemInView, changeView } = useViews({
    views: domViews,
    defaultView: domViewIds.MAIN
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
        const parsedElementsFound =
          getParent || byParentLevel
            ? getParentsOfElements(elementsFound, byParentLevel || 1)
            : elementsFound

        if (!parsedElementsFound.length) throw new Error('no elements')

        const elementsAsParam = {
          id,
          value: parsedElementsFound,
          type: parameterTypes.ELEMENTS
        }

        setElements(parsedElementsFound)
        setParams(insertParams(id, elementsAsParam))
        finish()
      })
      .catch(() => setMessage(domMessages.noElementsFound))
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
    setMessage,
    setParams,
    finish,
    id,
    getParent,
    byParentLevel
  ])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.GET_DOM_ELEMENTS:
          handleGetDomElements()
          break

        case actionTypes.NONE:
          setMessage(domMessages.unexpectedError)
          break
      }
    },
    [actionType, handleGetDomElements]
  )

  const handleAttributeEdition = ({ element }) => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    changeView(domViewIds.ATTRIBUTES)
  }
  const handleStylesOptionClick = ({ element }) => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    changeView(domViewIds.STYLES)
  }

  const handleElementClick = ({ element, event }) => {
    if (selectedElements.includes(element)) {
      const filteredSelectedElements = selectedElements.filter(
        (oldElement) => oldElement !== element
      )

      setSelectedElements(event.ctrlKey ? filteredSelectedElements : [element])
      return
    }

    setSelectedElements(
      event.ctrlKey ? [...selectedElements, element] : [element]
    )
  }

  const [headToElements, headToAttributes, headToStyles] = viewActions

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <CarouselItem>
            <Log
              variant={parameterTypes.ELEMENT}
              actionGroups={paginationActions}
            >
              <Carousel itemInView={pageNumber}>
                {pages.map((page, currentPageNumber) => {
                  return (
                    <CarouselItem key={currentPageNumber}>
                      <List
                        items={page}
                        Child={({ item }) => (
                          <Element
                            element={item}
                            onAttributesOptionClick={handleAttributeEdition}
                            onStylesOptionClick={handleStylesOptionClick}
                            onClick={handleElementClick}
                            variant={
                              selectedElements.includes(item)
                                ? 'pinned'
                                : 'default'
                            }
                          />
                        )}
                      />
                    </CarouselItem>
                  )
                })}
              </Carousel>
            </Log>
          </CarouselItem>

          <CarouselItem>
            <AttributeEditionLog
              element={editingElement}
              leftOptions={[headToElements]}
              rightOptions={[headToStyles]}
            />
          </CarouselItem>

          <CarouselItem>
            <Log
              variant={parameterTypes.STYLES}
              actionGroups={[headToElements, headToAttributes]}
              hasScroll
            >
              <List
                items={sheets}
                Child={({ item }) => (
                  <StyleSheet sheet={item} sheets={sheets} />
                )}
              />
            </Log>
          </CarouselItem>
        </Carousel>
      )}
    </>
  )
}

export const CommandDom = withOverlayContext(CommandDomWithoutContext)
