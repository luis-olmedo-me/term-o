import * as React from 'preact'

import useConfig from '@src/hooks/useConfig'
import Lines from '../../components/Lines'
import Log from '../../components/Log'
import * as S from './CommandsViewer.styles'

export const CommandsViewer = ({ command, updates, onInProgressCommandFinished, context }) => {
  const { listening } = useConfig({ get: ['max-lines-per-command'] })
  const [maxLinesPerCommand] = listening

  return (
    <S.LoggerWrapper className="vertical-scroller">
      {command && (
        <Log
          command={command}
          maxLinesPerCommand={maxLinesPerCommand}
          onFinished={onInProgressCommandFinished}
          context={context}
        />
      )}

      <Lines updates={updates} />
    </S.LoggerWrapper>
  )
}

CommandsViewer.propTypes = {
  command: Object,
  updates: Array,
  context: String,
  onInProgressCommandFinished: Function
}
