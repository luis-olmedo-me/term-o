import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { removeDuplicatedFromArray } from 'src/helpers/utils.helpers.js'
import { consoleCommands } from '../../commander.constants'
import { parameterTypes } from '../../constants/commands.constants'
import { Log } from '../../modules/Log'
import { helpActionTypes } from './CommandHelp.constants'
import {
  getActionType,
  getMessagesFromCommandsToCheck
} from './CommandHelp.helpers'
import { ListItem, UnsortedList } from './CommandHelp.styles'

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

      <Log variant={parameterTypes.HELP} hasScroll hasShadow>
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
      </Log>
    </>
  )
}
