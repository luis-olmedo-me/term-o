import React, { useCallback, useEffect, useRef, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  getActionType,
  getDefaultHTMlRoot,
  getOpenNodesFromObjetives
} from './CommandInspect.helpers'
import { inspectMessages } from './CommandInspect.messages'
import { Log, AttributeEditionLog } from '../../modules/Log'
import { inspectActionTypes } from './CommandInspect.constants'
import { NodeTree } from '../../modules/NodeTree/NodeTree.component'
import { getParamsByType } from '../../commander.helpers'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'

const CommandInspectWithoutContext = ({
  props,
  terminal: { command, setMessageData, params, finish },
  setHighlitedElement
}) => {
  const actionType = getActionType(props)
  const [HTMLRoot, setHTMLRoot] = useState(null)
  const [objetives, setObjetives] = useState([])
  const [openNodes, setOpenNodes] = useState([])
  const [editingElement, setEditingElement] = useState(null)

  const defaultRoot = useRef(null)

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
    [handleInspect, setMessageData, finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case inspectActionTypes.INSPECT:
          getDefaultHTMlRoot().then(handleInspect)
          break

        default:
          setMessageData(inspectMessages.unexpectedError)
          break
      }
    },
    [actionType, handleInspect, setMessageData]
  )

  const handleRootChange = (newRoot) => {
    const sanitazedNewRoot =
      newRoot === HTMLRoot ? defaultRoot.current : newRoot

    setHTMLRoot(sanitazedNewRoot)
  }

  const handleElementClick = (element) => {
    setEditingElement(element)
    setHighlitedElement(null)
  }

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Carousel itemInView={editingElement ? 1 : 0}>
        <Log variant={parameterTypes.ELEMENT}>
          {HTMLRoot && (
            <NodeTree
              root={HTMLRoot}
              objetives={objetives}
              setObjetives={setObjetives}
              openNodes={openNodes}
              setOpenNodes={setOpenNodes}
              setEditingElement={handleElementClick}
              handleRootChange={handleRootChange}
            />
          )}
        </Log>

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

export const CommandInspect = withOverlayContext(CommandInspectWithoutContext)
