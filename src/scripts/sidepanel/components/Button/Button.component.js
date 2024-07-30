import * as React from 'preact'
import * as S from './Button.styles'

export const Button = ({ text, onClick, fullWidth, fullHeight }) => {
  return (
    <S.ButtonWrapper onClick={onClick} fullWidth={fullWidth} fullHeight={fullHeight}>
      {text}
    </S.ButtonWrapper>
  )
}

Button.propTypes = {
  text: String,
  onClick: Function,
  fullWidth: Boolean,
  fullHeight: Boolean
}
