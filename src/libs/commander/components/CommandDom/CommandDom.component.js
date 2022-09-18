import React, { useEffect, useState, useCallback } from 'react'
import { Log, AttributeEditionLog } from '../../modules/Log'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements,
  getParentsOfElements
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { List, Element } from '../../modules/List'
import { domMessages } from './CommandDom.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { insertParams } from '../../commander.helpers'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'

const CommandDomWithoutContext = ({
  props,
  terminal: { command, setParams, setMessageData, finish },
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
  const [pinnedElements, setPinnedElements] = useState([])
  const [editingElement, setEditingElement] = useState(null)

  const actionType = getActionType(props)

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: elements,
    maxItems: 10
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
          setMessageData(domMessages.unexpectedError)
          break
      }
    },
    [actionType, handleGetDomElements]
  )

  const hasPinnedElements = pinnedElements.length > 0

  const handleElementClick = ({ element }) => {
    setEditingElement(element)
    setHighlitedElement(null)
  }

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Carousel itemInView={editingElement ? 1 : 0}>
        <CarouselItem>
          <Log variant={parameterTypes.ELEMENT} buttonGroups={buttonGroups}>
            {hasPinnedElements && (
              <List
                items={pinnedElements}
                Child={({ item }) => (
                  <Element
                    element={item}
                    pinnedElements={pinnedElements}
                    setPinnedElements={setPinnedElements}
                    shouldAnimate
                  />
                )}
              />
            )}

            <Carousel itemInView={pageNumber}>
              {pages.map((page, currentPageNumber) => {
                return (
                  <CarouselItem key={currentPageNumber}>
                    <List
                      items={page}
                      Child={({ item }) => (
                        <Element
                          element={item}
                          pinnedElements={pinnedElements}
                          setPinnedElements={setPinnedElements}
                          onClick={handleElementClick}
                          variant={
                            pinnedElements.includes(item) ? 'pinned' : 'default'
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
            onGoBack={() => setEditingElement(null)}
          />
        </CarouselItem>
      </Carousel>
    </>
  )
}

export const CommandDom = withOverlayContext(CommandDomWithoutContext)
