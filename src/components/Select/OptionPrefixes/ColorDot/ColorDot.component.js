import * as React from 'preact'
import * as S from './ColorDot.styles'

export const ColorDot = ({ option }) => {
  return <S.Dot color={option.id}></S.Dot>
}

ColorDot.propTypes = {
  option: String
}
