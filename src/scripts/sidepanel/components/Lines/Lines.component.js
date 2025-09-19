import * as React from 'preact'

import ColoredText from '../ColoredText'
import * as S from '../CommandInterpreter/CommandInterpreter.styles'

export const Lines = ({ updates }) => {
  return (
    <S.CommandInterpreterWrapper>
      {updates.map((update, index) => {
        return (
          <S.CommandInterpreterItem key={index}>
            <ColoredText value={update} />
          </S.CommandInterpreterItem>
        )
      })}
    </S.CommandInterpreterWrapper>
  )
}

Lines.propTypes = {
  updates: Array
}
