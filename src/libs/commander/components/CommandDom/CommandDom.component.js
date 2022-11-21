import * as React from 'preact'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { withOverlayContext } from '@modules/components/Overlay/Overlay.hoc'
import { isObjectFilterValidRegex } from 'helpers/dom.helpers'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { getParamsByType, insertParams } from '../../commander.helpers'
import { parameterTypes } from '../../constants/commands.constants'
import { Element, List, StyleSheet } from '../../modules/List'
import {
  AttributeEditionLog,
  Log,
  useElementActions,
  useMessageLog,
  usePaginationActions,
  useViews
} from '../../modules/Log'
import { getStylesFrom } from '../CommandCss/CommandCss.helpers'
import { domActionTypes, domViewIds, domViews } from './CommandDom.constants'
import {
  generateFilterByEvery,
  generateFilterBySome,
  getActionType,
  getElements,
  getParentsOfElements
} from './CommandDom.helpers'
import { domMessages } from './CommandDom.messages'

const CommandDomWithoutContext = ({
  props,
  terminal: { command, finish, params },
  id,
  setHighlitedElement
}) => {
  const { get, byText, byStyle, byAttr, hidden, byXpath, byParentLevel, getParent } = props

  const [elements, setElements] = useState([])
  const [editingElement, setEditingElement] = useState(null)
  const [sheets, setSheets] = useState(null)

  const actionType = getActionType(props)

  const handleAttributeEdition = element => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    changeView(domViewIds.ATTRIBUTES)
  }
  const handleStyleEdition = element => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    changeView(domViewIds.STYLES)
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: elements,
    maxItems: 10
  })
  const { viewActions, itemInView, changeView } = useViews({
    views: domViews,
    defaultView: domViewIds.MAIN
  })
  const { elementActions, selectedElements, selectElement } = useElementActions({
    onAttributeEdit: handleAttributeEdition,
    onStyleEdit: handleStyleEdition
  })

  const handleGetDomElements = useCallback(async () => {
    const hasByAttrFilter = Object.keys(byAttr).length
    const hasByStyleFilter = Object.keys(byStyle).length

    const hasValidAttrFilter = hasByAttrFilter ? isObjectFilterValidRegex(byAttr) : true
    const hasValidStyleFilter = hasByStyleFilter ? isObjectFilterValidRegex(byStyle) : true

    const hasFiltersBySome = byText.length || hasByStyleFilter || hasByAttrFilter

    if (!hasValidAttrFilter || !hasValidStyleFilter) throw new Error('invalidRegex')

    const hasFiltersByAll = !hidden

    const filterElementsBySome = generateFilterBySome({ byText, byStyle, byAttr })
    const filterElementsByEvery = generateFilterByEvery({ hidden })

    const { elementsFound } = await getElements({
      patterns: get,
      xpaths: byXpath,
      filterBySome: hasFiltersBySome ? filterElementsBySome : null,
      filterByEvery: hasFiltersByAll ? filterElementsByEvery : null
    })

    const parsedElementsFound =
      getParent || byParentLevel
        ? getParentsOfElements(elementsFound, byParentLevel || 1)
        : elementsFound

    if (!parsedElementsFound.length) throw new Error('noElementsFound')

    const elementsAsParam = { id, value: parsedElementsFound, type: parameterTypes.ELEMENTS }

    setElements(parsedElementsFound)
    return insertParams(id, elementsAsParam)
  }, [get, byStyle, byAttr, hidden, byXpath, id, getParent, byParentLevel])

  const handleSetAttribute = useCallback(() => {
    const attributes = Object.entries(props.attr)
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (paramElements.length === 0) throw new Error('noParameters')

    paramElements.forEach(element => {
      attributes.forEach(([key, value]) => {
        const isBoolean = typeof value === 'boolean'

        if (isBoolean && value) element.setAttribute(key, '')
        else if (isBoolean) element.removeAttribute(key)
        else element.setAttribute(key, value)
      })
    })

    setMessage(domMessages.attributeSetSuccess)
  }, [params, props])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case domActionTypes.GET_DOM_ELEMENTS:
        return await handleGetDomElements()

      case domActionTypes.SET_ATTRIBUTES:
        return handleSetAttribute()

      case domActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleGetDomElements])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(domMessages[error?.message] || domMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  const [headToElements, headToAttributes, headToStyles] = viewActions
  const [
    attributeEditionAction,
    styleEditionAction,
    scrollAction,
    copyAction,
    killAction
  ] = elementActions

  const handleElementClick = ({ event, element }) => {
    selectElement(element, event.ctrlKey)
  }

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <CarouselItem>
            <Log
              variant={parameterTypes.ELEMENT}
              actionGroups={[
                attributeEditionAction,
                styleEditionAction,
                ...paginationActions,
                scrollAction,
                copyAction,
                killAction
              ]}
              hasShadow
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
                            onClick={handleElementClick}
                            variant={selectedElements.includes(item) ? 'pinned' : 'default'}
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
              hasShadow
            >
              <List
                items={sheets}
                Child={({ item }) => <StyleSheet sheet={item} sheets={sheets} />}
              />
            </Log>
          </CarouselItem>
        </Carousel>
      )}
    </>
  )
}

export const CommandDom = withOverlayContext(CommandDomWithoutContext)
