import * as React from 'react'
import { useEffect, useCallback } from 'react'

import { Log } from '../../modules/Log'

import { parameterTypes } from '../../constants/commands.constants'
import { historyMessages } from './CommandHistory.messages'
import { getActionType } from './CommandHistory.helpers'
import { historyActionTypes } from './CommandHistory.constants'
import { fetchHistorial } from '../../../../helpers/event.helpers'

export const CommandHistory = ({
  props,
  terminal: { command, setMessageData, finish }
}) => {
  const { goto, protocol } = props

  const actionType = getActionType(props)

  const handleRedirect = useCallback(() => {
    if (!goto.length) return setMessageData(historyMessages.missingURL)

    goto.forEach((url) => {
      const formattedUrl = url.startsWith('www') ? url : `www.${url}`

      window.open(`${protocol}://${formattedUrl}`, '_blank')
    })

    setMessageData(historyMessages.redirectionSuccess, {
      urlCount: goto.length
    })
    finish()
  }, [goto, setMessageData, protocol, finish])

  const handleShowHistorial = useCallback(
    (historial) => {
      console.log('historial', historial)
      finish()
    },
    [setMessageData, finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case historyActionTypes.SHOW_LIST:
          fetchHistorial()
            .then(handleShowHistorial)
            .catch(() => finish())
          break

        case historyActionTypes.REDIRECT:
          handleRedirect()
          break

        default:
          break
      }
    },
    [actionType, handleRedirect, handleShowHistorial]
  )

  return <Log variant={parameterTypes.COMMAND}>{command}</Log>
}
