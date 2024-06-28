import * as React from 'preact'

import Log from '@sidepanel/components/Log'
import { useCallback, useRef } from 'preact/hooks'
import * as S from './Logger.styles'

export const Logger = ({ logs }) => {
  const loggerRef = useRef(null)

  const scrollLogsToBottom = useCallback(() => {
    loggerRef.current.scrollTo({ top: loggerRef.current.scrollHeight })
  }, [])

  return (
    <S.LoggerWrapper ref={loggerRef}>
      {logs.map((command, index) => {
        const isLastLog = index === logs.length - 1

        return (
          <Log
            key={command.id}
            command={command}
            scrollLogsToBottom={isLastLog ? scrollLogsToBottom : null}
            prefix="$"
          />
        )
      })}
    </S.LoggerWrapper>
  )
}
