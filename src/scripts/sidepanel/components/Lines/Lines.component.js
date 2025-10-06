import * as React from 'preact'

import ColoredText from '../ColoredText'
import * as S from '../CommandInterpreter/CommandInterpreter.styles'

export const Lines = ({ updates }) => {
  return (
    <div>
      {updates.map((update, index) => {
        return (
          <S.CommandInterpreterItem key={index}>
            <ColoredText value={update} />
          </S.CommandInterpreterItem>
        )
      })}
    </div>
  )
}

Lines.propTypes = {
  updates: Array
}
