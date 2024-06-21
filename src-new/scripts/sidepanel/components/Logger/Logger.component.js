import * as React from 'preact'

import * as S from './Logger.styles'

export const Logger = ({ logs }) => {
  return (
    <S.LoggerWrapper>
      {logs.reverse().map(log => (
        <p>{log}</p>
      ))}
    </S.LoggerWrapper>
  )
}
