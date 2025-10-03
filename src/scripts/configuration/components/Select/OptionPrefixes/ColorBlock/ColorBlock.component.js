import * as React from 'preact'
import * as S from './ColorBlock.styles'

export const ColorBlock = ({ color }) => {
  return <S.Dot className={color}></S.Dot>
}

ColorBlock.propTypes = {
  color: String
}
