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
      {Icon && (
        <S.ButtonIconWrapper>
          <Icon size={iconSizes.SMALL} />
        </S.ButtonIconWrapper>
      )}

      {value && <span>{value}</span>}
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
