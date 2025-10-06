import * as React from 'preact'

import CommandInterpreter from '../../components/CommandInterpreter'
import * as S from './CommandsViewer.styles'

export const CommandsViewer = ({ commands }) => {
  return (
    <S.LoggerWrapper className="vertical-scroller">
      <CommandInterpreter commands={commands} />
    </S.LoggerWrapper>
  )
}

CommandsViewer.propTypes = {
  updates: Array,
  commands: Array
}
