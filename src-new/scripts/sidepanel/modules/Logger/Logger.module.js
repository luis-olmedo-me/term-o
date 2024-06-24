import * as React from 'preact'

import * as S from './Logger.styles'

export const Logger = ({ logs }) => {
  return (
    <S.LoggerWrapper>
      {logs.map(log => !log.hidden && <p key={log.id}>$ {log.command}</p>)}
    </S.LoggerWrapper>
  )
}
