import * as React from 'preact'

import * as S from './Logger.styles'

export const Logger = ({ logs }) => {
  return (
    <S.LoggerWrapper>
      {logs.reverse().map(log => (
        <p key={log.id}>$ {log.command}</p>
      ))}
    </S.LoggerWrapper>
  )
}
