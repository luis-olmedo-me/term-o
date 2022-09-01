import React, { useCallback, useEffect, useRef, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { getActionType } from './CommandInspect.helpers'
import { inspectMessages } from './CommandInspect.messages'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { inspectActionTypes } from './CommandInspect.constants'
import { getElements } from '../CommandDom/CommandDom.helpers'
import { NodeTree } from '../../modules/NodeTree/NodeTree.component'
import { getParamsByType } from '../../commander.helpers'

export const CommandInspect = ({
  props,
  terminal: { command, setMessageData, params }
}) => {
  const actionType = getActionType(props)
  const [HTMLRoot, setHTMLRoot] = useState(null)
  const [objetives, setObjetives] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const defaultRoot = useRef(null)

  const handleInspect = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)
    const elementsSearch = getElements({
      patterns: ['html'],
      filterBySome: null,
      filterByEvery: null
    })

    setObjetives(paramElements.length ? paramElements : [document.body])

    elementsSearch
      .then(({ elementsFound: [foundHTMLRoot] }) => {
        defaultRoot.current = foundHTMLRoot
        setHTMLRoot(foundHTMLRoot)
      })
      .catch(() => setMessageData(domMessages.noElementsFound))
      .finally(() => setIsLoading(false))
  }, [handleInspect, setMessageData, params])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case inspectActionTypes.INSPECT:
          handleInspect()
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

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper isLoading={isLoading} variant={parameterTypes.ELEMENT}>
        {HTMLRoot && (
          <NodeTree
            root={HTMLRoot}
            objetives={objetives}
            setObjetives={setObjetives}
            handleRootChange={handleRootChange}
          />
        )}
      </LogWrapper>
    </>
  )
}
