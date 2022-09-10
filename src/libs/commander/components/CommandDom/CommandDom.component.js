import React, { useEffect, useState, useCallback } from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements,
  getParentsOfElements
} from './CommandDom.helpers'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { ParameterElements } from '../../modules/ParameterElements/ParameterElements.component'
import { domMessages } from './CommandDom.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { insertParams } from '../../commander.helpers'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { ConsoleModal } from 'src/projects/content/modules/Console/components/ConsoleModal/ConsoleModal.component'
import { ElementEdition } from '../../modules/ElementEdition/ElementEdition.component'
import { ElementLabel } from '../../modules/NodeTree/components/ElementLabel/ElementLabel.component'
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
        const parsedElementsFound = getParent
          ? getParentsOfElements(elementsFound)
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
    getParent
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
  const hasPages = pages.length > 0

  const handleModalExit = useCallback(
    () => setEditingElement(null),
    [setEditingElement]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.ELEMENT} buttonGroups={buttonGroups}>
        {hasPinnedElements && (
          <ParameterElements
            elements={pinnedElements}
            pinnedElements={pinnedElements}
            setPinnedElements={setPinnedElements}
            shouldAnimate
          />
        )}

        {hasPages && (
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <ParameterElements
                    elements={page}
                    pinnedElements={pinnedElements}
                    setPinnedElements={setPinnedElements}
                    customProps={{
                      onClick: ({ element }) => setEditingElement(element)
                    }}
                  />
                </CarouselItem>
              )
            })}
          </Carousel>
        )}
      </LogWrapper>

      <ConsoleModal
        isOpen={Boolean(editingElement)}
        title={<ElementLabel element={editingElement} hideAttributes />}
        titleProps={{
          onMouseEnter: () => setHighlitedElement(editingElement),
          onMouseLeave: () => setHighlitedElement(null)
        }}
        onExit={handleModalExit}
      >
        <ElementEdition element={editingElement} />
      </ConsoleModal>
    </>
  )
}

export const CommandDom = withOverlayContext(CommandDomWithoutContext)
