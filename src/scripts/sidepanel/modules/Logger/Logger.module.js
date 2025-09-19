import * as React from 'preact'

import useConfig from '@src/hooks/useConfig'
import { useCallback } from 'preact/hooks'
import Log from '../../components/Log'
import * as S from './Logger.styles'
Log
export const Logger = ({ logs, loggerRef, command }) => {
  const { listening } = useConfig({ get: ['max-lines-per-command'] })
  const [maxLinesPerCommand] = listening

  const scrollLogsToBottom = useCallback(() => {
    loggerRef.current.scrollTo({ top: loggerRef.current.scrollHeight })
  }, [])

  scrollLogsToBottom
  maxLinesPerCommand
  logs
  command

  return (
    <S.LoggerWrapper ref={loggerRef} className="vertical-scroller">
      {command && (
        <Log
          command={command}
          maxLinesPerCommand={maxLinesPerCommand}
          scrollLogsToBottom={scrollLogsToBottom}
        />
      )}

      {/* {logs.map((command, index) => {
        const isLastLog = index === logs.length - 1

        return (
          <Log
            key={command.id}
            command={command}
            maxLinesPerCommand={maxLinesPerCommand}
            scrollLogsToBottom={isLastLog ? scrollLogsToBottom : null}
          />
        )
      })} */}
    </S.LoggerWrapper>
  )
}

Logger.propTypes = {
  command: Object,
  logs: Array,
  loggerRef: Object
}
