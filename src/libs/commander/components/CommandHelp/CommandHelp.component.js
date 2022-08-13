import React, { useCallback, useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { helpActionTypes } from './CommandHelp.constants'
import { getActionType } from './CommandHelp.helpers'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { consoleCommands } from '../../commander.constants'

export const CommandHelp = ({
  props,
  terminal: { command, setMessageData }
}) => {
  const actionType = getActionType(props)
  const { about } = props
  const [localMessages, setLocalMessages] = useState([])

  const handleHelp = useCallback(() => {
    const messagesForHelp = about.reduce((messages, commandToHelpWith) => {
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
                text: `--${propName} - ${propConfig.description}`
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
  }, [about])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case helpActionTypes.HELP:
          handleHelp()
          break

        case helpActionTypes.NONE:
          console.log('default')
          break
      }
    },
    [actionType, handleHelp]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.INFO}>
        {localMessages.map(({ id, title, items, warning }) => {
          const hasItems = items?.length > 0
          const showList = hasItems || warning

          return (
            <div key={id}>
              <h4 style={{ margin: 0 }}>{title}</h4>

              {showList && (
                <ul style={{ margin: 0 }}>
                  {warning && <li style={{ color: 'yellow' }}>{warning}</li>}

                  {items?.map(({ id, text }) => (
                    <li key={id}>{text}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </LogWrapper>
    </>
  )
}
