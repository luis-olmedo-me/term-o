import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { helpActionTypes } from './CommandHelp.constants'
import {
  getActionType,
  getMessagesFromCommandsToCheck
} from './CommandHelp.helpers'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { consoleCommands } from '../../commander.constants'
import { List } from 'modules/components/Table/List/List.component'
import { Title } from './CommandHelp.styles'

export const CommandHelp = ({ props, terminal: { command } }) => {
  const actionType = getActionType(props)
  const { about } = props
  const [localMessages, setLocalMessages] = useState([])

  const handleHelp = useCallback((commands) => {
    const commandsNoRepeated = Array.from(new Set(commands))

    const messagesForHelp = getMessagesFromCommandsToCheck({
      commands: commandsNoRepeated
    })

    setLocalMessages(messagesForHelp)
  }, [])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case helpActionTypes.HELP:
          handleHelp(about)
          break

        case helpActionTypes.NONE: {
          const allCommandNames = Object.keys(consoleCommands)
          handleHelp(allCommandNames)
          break
        }
      }
    },
    [actionType, handleHelp, about]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.HELP}>
        {localMessages.map(({ id, title, items, warning }) => {
          const hasItems = items?.length > 0
          const showList = hasItems || warning

          return (
            <div key={id}>
              <Title>{title}</Title>

              {showList && <List items={items} warning={warning} />}
            </div>
          )
        })}
      </LogWrapper>
    </>
  )
}
