import * as React from 'preact'
import * as S from './Button.styles'

export const Button = ({
  text,
  onClick,
  variant,
  Icon = null,
  fullWidth = false,
  selected = false
}) => {
  return (
    <S.ButtonWrapper
      onClick={onClick}
      selected={selected}
      aria-full-width={fullWidth}
      aria-selected={selected}
      aria-variant={variant}
    >
      {Icon && <Icon />}
      {text}
    </S.ButtonWrapper>
  )
}

Button.propTypes = {
  text: String,
  onClick: Function,
  fullWidth: Boolean,
  selected: Boolean,
  Icon: Object,
  variant: String
}
