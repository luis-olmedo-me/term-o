import * as React from 'preact'
import * as S from './ColorDot.styles'

export const ColorDot = ({ color }) => {
  return <S.Dot className={color}></S.Dot>
}

ColorDot.propTypes = {
  color: String
}
