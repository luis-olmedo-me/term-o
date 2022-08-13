import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { helpActionTypes } from './CommandHelp.constants'
import { getActionType } from './CommandHelp.helpers'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { consoleCommands } from '../../commander.constants'
import { List } from 'modules/components/Table/List/List.component'
import { Title } from './CommandHelp.styles'

export const CommandHelp = ({ props, terminal: { command } }) => {
  const actionType = getActionType(props)
  const { about } = props
  const [localMessages, setLocalMessages] = useState([])

  const handleHelp = useCallback((commands) => {
    const messagesForHelp = commands.reduce((messages, commandToHelpWith) => {
      const commandData = consoleCommands[commandToHelpWith]

      if (commandData) {
        const { props } = commandData

        return [
          ...messages,
          {
            id: commandToHelpWith,
            title: commandToHelpWith,
            items: Object.entries(props).map(([propName, propConfig]) => {
              return {
                id: propConfig.key,
                text: `--${propName} <${propConfig.type}> - ${propConfig.description}`
              }
            })
          }
        ]
      } else {
        return [
          ...messages,
          {
            id: commandToHelpWith,
            title: commandToHelpWith,
            warning: 'Command not found'
          }
        ]
      }
    }, [])

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
