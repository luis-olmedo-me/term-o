import React, { useEffect } from 'react'

import { LogWrapper } from '../LogWrapper/LogWrapper.component'

import { parameterTypes } from '../../constants/commands.constants'
import { historyMessages } from './CommandHistory.helpers'

export const CommandHistory = ({
  props: { goto, protocol },
  terminal: { command, setMessageData }
}) => {
  useEffect(
    function pushIntoURL() {
      if (!goto.length) return setMessageData(historyMessages.missingURL)

      goto.forEach((url) => {
        const formattedUrl = url.startsWith('www') ? url : `www.${url}`

        window.open(`${protocol}://${formattedUrl}`, '_blank')
      })

      setMessageData(historyMessages.redirectionSuccess, {
        urlCount: goto.length
      })
    },
    [goto, protocol]
  )

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}
