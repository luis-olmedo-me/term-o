import * as React from 'preact'

import { addPageEvents } from '@src/helpers/event.helpers.js'
import { checkIfRegExpIsValid, generateUUID } from '@src/helpers/utils.helpers'
import { useCallback, useEffect } from 'preact/hooks'
import { customPageEventNames, parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog } from '../../modules/Log'
import { onActionTypes } from './CommandOn.constants'
import { getActionType } from './CommandOn.helpers'
import { onMessages } from './CommandOn.messages'

export const CommandOn = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleAddEvent = useCallback(async () => {
    const areURLsValid = props.url.every(checkIfRegExpIsValid)

    if (!props.run.length) throw new Error('missingCommand')
    if (!areURLsValid) throw new Error('invalidURLRegularExpressions')
    if (props.event && !customPageEventNames.includes(props.event))
      throw new Error('invalidEventType')

    const urlForEvent = props.url.join('|')
    const commandsToRun = props.run.map(commandToRun => {
      return {
        id: generateUUID(),
        command: commandToRun,
        url: urlForEvent,
        event: props.event
      }
    })

    await addPageEvents(commandsToRun)
    setMessage(onMessages.eventSaveSuccess)
  }, [props, setMessage])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case onActionTypes.ADD_EVENT:
        return await handleAddEvent()

      case onActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleAddEvent])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(onMessages[error?.message] || onMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}
    </>
  )
}
