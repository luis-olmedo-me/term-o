import * as React from 'preact'

import ColoredText from '../ColoredText'
import * as S from '../Log/Log.styles'

export const Lines = ({ updates }) => {
  return (
    <S.LogWrapper>
      {updates.reverse().map((update, index) => {
        return (
          <S.LogItem key={index}>
            <ColoredText value={update} />
          </S.LogItem>
        )
      })}
    </S.LogWrapper>
  )
}

Lines.propTypes = {
  updates: Array
}
