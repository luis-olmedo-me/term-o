import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { withOverlayContext } from '@modules/components/Overlay/Overlay.hoc'
import { getParamsByType } from '../../commander.helpers'
import { parameterTypes } from '../../constants/commands.constants'
import { List, StyleSheet } from '../../modules/List'
import {
  AttributeEditionLog,
  LogCard,
  LogContainer,
  useElementActions,
  useMessageLog,
  useViews
} from '../../modules/Log'
import { NodeTree } from '../../modules/NodeTree/NodeTree.component'
import { getStylesFrom } from '../CommandCss/CommandCss.helpers'
import { inspectActionTypes, inspectViewIds, inspectViews } from './CommandInspect.constants'
import {
  getActionType,
  getDefaultHTMlRoot,
  getOpenNodesFromObjetives
} from './CommandInspect.helpers'
import { inspectMessages } from './CommandInspect.messages'

const CommandInspectWithoutContext = ({
  props,
  terminal: { command, params, finish },
  setHighlitedElement
}) => {
  const actionType = getActionType(props)

  const [HTMLRoot, setHTMLRoot] = useState(null)
  const [openNodes, setOpenNodes] = useState([])
  const [editingElement, setEditingElement] = useState(null)
  const [sheets, setSheets] = useState(null)

  const defaultRoot = useRef(null)

  const handleAttributeEdition = element => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    changeView(inspectViewIds.ATTRIBUTES)
  }
  const handleStyleEdition = element => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    changeView(inspectViewIds.STYLES)
  }
  const handleRootEdition = element => {
    const sanitazedNewRoot = element === HTMLRoot ? defaultRoot.current : element

    setHTMLRoot(sanitazedNewRoot)
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { viewActions, itemInView, changeView } = useViews({
    views: inspectViews,
    defaultView: inspectViewIds.MAIN
  })
  const { elementActions, selectedElements, selectElement } = useElementActions({
    onAttributeEdit: handleAttributeEdition,
    onStyleEdit: handleStyleEdition,
    onRootEdit: handleRootEdition
  })

  const handleInspect = useCallback(async () => {
    const { elementsFound } = await getDefaultHTMlRoot()
    const [defaultHTMLRoot] = elementsFound

    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)
    const newObjetives = paramElements.length ? paramElements : [document.body]
    const newOpenNodes = getOpenNodesFromObjetives(newObjetives)

    setOpenNodes(newOpenNodes)
    setHTMLRoot(document.body)
    defaultRoot.current = defaultHTMLRoot
  }, [handleInspect])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case inspectActionTypes.INSPECT:
        return await handleInspect()

      case inspectActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleInspect])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(inspectMessages[error?.message] || inspectMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  const [headToElements, headToAttributes, headToStyles] = viewActions

  const handleElementClick = ({ event, element }) => {
    selectElement(element, event.ctrlKey)
  }

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <LogCard
            variant={parameterTypes.ELEMENT}
            actions={elementActions}
            command={command}
            hasScroll
            hasShadow
          >
            {HTMLRoot && (
              <NodeTree
                root={HTMLRoot}
                objetives={selectedElements}
                onElementClick={handleElementClick}
                openNodes={openNodes}
                setOpenNodes={setOpenNodes}
                setEditingElement={handleAttributeEdition}
                onStylesOptionClick={handleStyleEdition}
              />
            )}
          </LogCard>

          <CarouselItem>
            <AttributeEditionLog
              id="elemenAttributetInspected"
              element={editingElement}
              leftOptions={[headToElements]}
              rightOptions={[headToStyles]}
              command={command}
            />
          </CarouselItem>

          <CarouselItem>
            <LogCard
              variant={parameterTypes.STYLES}
              actions={[headToElements, headToAttributes]}
              command={command}
              hasScroll
              hasShadow
            >
              <List
                items={sheets}
                Child={({ item }) => <StyleSheet sheet={item} sheets={sheets} />}
              />
            </LogCard>
          </CarouselItem>
        </Carousel>
      )}
    </LogContainer>
  )
}

export const CommandInspect = withOverlayContext(CommandInspectWithoutContext)
