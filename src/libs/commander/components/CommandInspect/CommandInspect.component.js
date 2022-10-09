import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  getActionType,
  getDefaultHTMlRoot,
  getOpenNodesFromObjetives
} from './CommandInspect.helpers'
import { inspectMessages } from './CommandInspect.messages'
import { Log, AttributeEditionLog, useMessageLog } from '../../modules/Log'
import { inspectActionTypes } from './CommandInspect.constants'
import { NodeTree } from '../../modules/NodeTree/NodeTree.component'
import { getParamsByType } from '../../commander.helpers'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { List, StyleSheet } from '../../modules/List'
import { getStylesFrom } from '../CommandCss/CommandCss.helpers'

const inspectViews = {
  MAIN: 0,
  ATTRIBUTES: 1,
  STYLES: 2
}

const CommandInspectWithoutContext = ({
  props,
  terminal: { command, params, finish },
  setHighlitedElement
}) => {
  const actionType = getActionType(props)

  const [HTMLRoot, setHTMLRoot] = useState(null)
  const [objetives, setObjetives] = useState([])
  const [openNodes, setOpenNodes] = useState([])
  const [editingElement, setEditingElement] = useState(null)
  const [itemInView, setItemInView] = useState(0)
  const [sheets, setSheets] = useState(null)

  const defaultRoot = useRef(null)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleInspect = useCallback(
    ({ elementsFound: [defaultHTMLRoot] }) => {
      const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)
      const newObjetives = paramElements.length
        ? paramElements
        : [document.body]
      const newOpenNodes = getOpenNodesFromObjetives(newObjetives)

      setObjetives(newObjetives)
      setOpenNodes(newOpenNodes)
      setHTMLRoot(document.body)
      defaultRoot.current = defaultHTMLRoot

      finish()
    },
    [handleInspect, setMessage, finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case inspectActionTypes.INSPECT:
          getDefaultHTMlRoot().then(handleInspect)
          break

        default:
          setMessage(inspectMessages.unexpectedError)
          break
      }
    },
    [actionType, handleInspect, setMessage]
  )

  const handleRootChange = (newRoot) => {
    const sanitazedNewRoot =
      newRoot === HTMLRoot ? defaultRoot.current : newRoot

    setHTMLRoot(sanitazedNewRoot)
  }

  const handleElementClick = ({ element }) => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    setItemInView(inspectViews.ATTRIBUTES)
  }
  const handleStylesOptionClick = ({ element }) => {
    setEditingElement(element)
    setSheets(getStylesFrom(element))
    setHighlitedElement(null)

    setItemInView(inspectViews.STYLES)
  }

  const handleHeadToElementsView = () => {
    setItemInView(inspectViews.MAIN)
    setEditingElement(null)
  }
  const handleHeadToAttributesView = () => {
    setItemInView(inspectViews.ATTRIBUTES)
  }
  const handleHeadToStylesView = () => {
    setItemInView(inspectViews.STYLES)
  }

  const headToElements = {
    id: 'head-to-elements',
    text: '<☰',
    onClick: handleHeadToElementsView
  }
  const headToStyles = {
    id: 'head-to-styles',
    text: '✂️',
    onClick: handleHeadToStylesView
  }
  const headToAttributes = {
    id: 'head-to-attributes',
    text: '✏️',
    onClick: handleHeadToAttributesView
  }

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <Log variant={parameterTypes.ELEMENT} hasScroll>
            {HTMLRoot && (
              <NodeTree
                root={HTMLRoot}
                objetives={objetives}
                setObjetives={setObjetives}
                openNodes={openNodes}
                setOpenNodes={setOpenNodes}
                setEditingElement={handleElementClick}
                onStylesOptionClick={handleStylesOptionClick}
                handleRootChange={handleRootChange}
              />
            )}
          </Log>

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

export const CommandInspect = withOverlayContext(CommandInspectWithoutContext)
