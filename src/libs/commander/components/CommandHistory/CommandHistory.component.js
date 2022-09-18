import React, { useEffect, useCallback } from 'react'

import { Log } from '../../modules/Log'

import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { historyMessages } from './CommandHistory.messages'
import { getActionType } from './CommandHistory.helpers'

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

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.REDIRECT:
          handleRedirect()
          break

        default:
          break
      }
    },
    [actionType, handleRedirect]
  )

  return <Log variant={parameterTypes.COMMAND}>{command}</Log>
}
