import * as React from 'preact'

import * as S from './Logger.styles'

export const Logger = ({ logs }) => {
  return (
    <S.LoggerWrapper>
      {logs.map(log => (
        <div>{log}</div>
      ))}
    </S.LoggerWrapper>
  )
}
