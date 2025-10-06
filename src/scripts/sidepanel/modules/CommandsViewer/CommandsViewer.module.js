import * as React from 'preact'

import CommandInterpreter from '../../components/CommandInterpreter'
import * as S from './CommandsViewer.styles'

export const CommandsViewer = ({ command, commands }) => {
  return (
    <S.LoggerWrapper className="vertical-scroller">
      <CommandInterpreter command={command} commands={commands} />
    </S.LoggerWrapper>
  )
}

CommandsViewer.propTypes = {
  command: Object,
  updates: Array,
  commands: Array
}
