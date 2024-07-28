import * as React from 'preact'
import * as S from './Button.styles'

export const Button = ({ text, onClick, fullWidth }) => {
  return (
    <S.ButtonWrapper onClick={onClick} fullWidth={fullWidth}>
      {text}
    </S.ButtonWrapper>
  )
}

Button.propTypes = {
  text: String,
  onClick: Function,
  fullWidth: Boolean
}
