import React, { useEffect } from 'react'

import { LogWrapper } from '../LogWrapper/LogWrapper.component'

import { parameterTypes } from '../../easyCommander.constants'

export const CommandHistory = ({ command, props: { goto, protocol } }) => {
  useEffect(
    function pushIntoURL() {
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
        Showing history command...
      </LogWrapper>
    </>
  )
}
