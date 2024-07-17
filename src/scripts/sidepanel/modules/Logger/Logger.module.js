import * as React from 'preact'

import { useCallback } from 'preact/hooks'
import Log from '../../components/Log'
import * as S from './Logger.styles'

export const Logger = ({ logs, loggerRef }) => {
  const scrollLogsToBottom = useCallback(() => {
    loggerRef.current.scrollTo({ top: loggerRef.current.scrollHeight })
  }, [])

  return (
    <S.LoggerWrapper ref={loggerRef} className="vertical-scroller">
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

Logger.propTypes = {
  logs: Array,
  loggerRef: Object
}
