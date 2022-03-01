import React, { useEffect } from 'react'

import { LogWrapper } from '../LogWrapper/LogWrapper.component'

import { parameterTypes } from '../../easyCommander.constants'

export const CommandHistory = ({
  command,
  props: { goto, protocol },
  setMessageData
}) => {
  useEffect(
    function pushIntoURL() {
      if (!goto.length) {
        return setMessageData({
          message: 'No url has been provided.',
          type: parameterTypes.ERROR
        })
      }

      goto.forEach((url) => {
        const formattedUrl = url.startsWith('www') ? url : `www.${url}`

        window.open(`${protocol}://${formattedUrl}`, '_blank')
      })
    },
    [goto, protocol]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.SUCCESS}>
        {`Successfully opened ${goto.length} url(s).`}
      </LogWrapper>
    </>
  )
}
