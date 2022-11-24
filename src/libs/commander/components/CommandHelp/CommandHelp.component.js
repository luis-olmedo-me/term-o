import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { removeDuplicatedFromArray } from '@src/helpers/utils.helpers.js'
import { consoleCommands } from '../../commander.constants'
import { commanderMessages } from '../../commander.messages.js'
import { parameterTypes } from '../../constants/commands.constants'
import { LogCard, LogContainer, useMessageLog } from '../../modules/Log'
import { helpActionTypes } from './CommandHelp.constants'
import { getActionType, getMessagesFromCommandsToCheck } from './CommandHelp.helpers'
import { ListItem, UnsortedList } from './CommandHelp.styles'

export const CommandHelp = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)
  const [localMessages, setLocalMessages] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()

  const handleHelp = useCallback(
    (commands = props.about) => {
      const commandsNoRepeated = removeDuplicatedFromArray(commands)
      const messagesForHelp = getMessagesFromCommandsToCheck({ commands: commandsNoRepeated })

      setLocalMessages(messagesForHelp)
    },
    [props]
  )

  const handleAllHelp = useCallback(() => {
    const allCommandNames = Object.keys(consoleCommands)

    handleHelp(allCommandNames)
  }, [handleHelp])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case helpActionTypes.HELP:
        return handleHelp()

      case helpActionTypes.NONE:
        return handleAllHelp()
    }
  }, [actionType, handleHelp, handleAllHelp])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(commanderMessages[error?.message] || commanderMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <LogCard variant={parameterTypes.HELP} command={command} hasScroll hasShadow>
          {localMessages.map(({ id, title, items }) => {
            return (
              <UnsortedList key={id}>
                <ListItem>
                  {title}

                  <UnsortedList>
                    {items.map(({ id, title, description }) => {
                      return (
                        <ListItem key={id}>
                          {title}

                          <UnsortedList>
                            <ListItem>{description}</ListItem>
                          </UnsortedList>
                        </ListItem>
                      )
                    })}
                  </UnsortedList>
                </ListItem>
              </UnsortedList>
            )
          })}
        </LogCard>
      )}
    </LogContainer>
  )
}
