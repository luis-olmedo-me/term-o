import * as React from 'preact'

import Log from '../../components/CommandInterpreter'
import Lines from '../../components/Lines'
import * as S from './CommandsViewer.styles'

export const CommandsViewer = ({ command, updates, onInProgressCommandFinished, context }) => {
  return (
    <S.LoggerWrapper className="vertical-scroller">
      {command && (
        <Log command={command} onFinished={onInProgressCommandFinished} context={context} />
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
