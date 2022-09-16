import React, { useCallback, useEffect, useRef, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  getActionType,
  getDefaultHTMlRoot,
  getOpenNodesFromObjetives
} from './CommandInspect.helpers'
import { inspectMessages } from './CommandInspect.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { inspectActionTypes } from './CommandInspect.constants'
import { NodeTree } from '../../modules/NodeTree/NodeTree.component'
import { getParamsByType } from '../../commander.helpers'
import { ConsoleModal } from 'src/projects/content/modules/Console/components/ConsoleModal/ConsoleModal.component'
import { ElementEdition } from '../../modules/ElementEdition/ElementEdition.component'
import { ElementLabel } from '../../modules/NodeTree/components/ElementLabel/ElementLabel.component'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'

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
        : [defaultHTMLRoot]
      const newOpenNodes = getOpenNodesFromObjetives(newObjetives)

      setObjetives(newObjetives)
      setOpenNodes(newOpenNodes)
      setHTMLRoot(defaultHTMLRoot)
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
          finish()
          break
      }
    },
    [actionType, handleInspect, setMessageData, finish]
  )

  const handleRootChange = (newRoot) => {
    const sanitazedNewRoot =
      newRoot === HTMLRoot ? defaultRoot.current : newRoot

    setHTMLRoot(sanitazedNewRoot)
  }

  const handleModalExit = useCallback(
    () => setEditingElement(null),
    [setEditingElement]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.ELEMENT}>
        {HTMLRoot && (
          <NodeTree
            root={HTMLRoot}
            objetives={objetives}
            setObjetives={setObjetives}
            openNodes={openNodes}
            setOpenNodes={setOpenNodes}
            setEditingElement={setEditingElement}
            handleRootChange={handleRootChange}
          />
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

export const CommandInspect = withOverlayContext(CommandInspectWithoutContext)
