import * as React from 'preact'

import { iconSizes } from '@src/constants/icon.constants'

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
      aria-full-width={fullWidth}
      aria-selected={selected}
      aria-variant={variant}
    >
      {Icon && <Icon size={iconSizes.NORMAL} />}

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
