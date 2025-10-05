import * as React from 'preact'
import * as S from './Button.styles'

export const Button = ({
  value,
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

      {value}
    </S.ButtonWrapper>
  )
}

Button.propTypes = {
  value: String,
  onClick: Function,
  fullWidth: Boolean,
  selected: Boolean,
  Icon: Object,
  variant: String
}
