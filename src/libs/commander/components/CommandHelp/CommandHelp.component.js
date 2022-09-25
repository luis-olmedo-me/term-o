import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { helpActionTypes } from './CommandHelp.constants'
import {
  getActionType,
  getMessagesFromCommandsToCheck
} from './CommandHelp.helpers'
import { Log } from '../../modules/Log'
import { consoleCommands } from '../../commander.constants'
import { Title } from './CommandHelp.styles'
import { removeDuplicatedFromArray } from 'src/helpers/utils.helpers.js'
import { SimpleList } from '../../modules/List'

export const CommandHelp = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)
  const { about } = props
  const [localMessages, setLocalMessages] = useState([])

  const handleHelp = useCallback(
    (commands) => {
      const commandsNoRepeated = removeDuplicatedFromArray(commands)

      const messagesForHelp = getMessagesFromCommandsToCheck({
        commands: commandsNoRepeated
      })

      setLocalMessages(messagesForHelp)
      finish()
    },
    [finish]
  )

  const handleAllHelp = useCallback(() => {
    const allCommandNames = Object.keys(consoleCommands)

    handleHelp(allCommandNames)
    finish()
  }, [handleHelp, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case helpActionTypes.HELP:
          handleHelp(about)
          break

        case helpActionTypes.NONE: {
          handleAllHelp()
          break
        }
      }
    },
    [actionType, handleHelp, about]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Log variant={parameterTypes.HELP}>
        {localMessages.map(({ id, title, items, warning }) => {
          const hasItems = items?.length > 0
          const showList = hasItems || warning

          return (
            <div key={id}>
              <Title>{title}</Title>

              <ul>
                {showList &&
                  items.map(({ id, title, description }) => {
                    return (
                      <li key={id}>
                        {title}

                        <ul>
                          <li>{description}</li>
                        </ul>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )
        })}
      </Log>
    </>
  )
}
