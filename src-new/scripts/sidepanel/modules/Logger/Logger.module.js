import * as React from 'preact'

import Log from '@sidepanel/components/Log'
import * as S from './Logger.styles'

export const Logger = ({ logs }) => {
  return (
    <S.LoggerWrapper>
      {logs.map(command => (
        <Log key={command.id} command={command} />
      ))}
    </S.LoggerWrapper>
  )
}
