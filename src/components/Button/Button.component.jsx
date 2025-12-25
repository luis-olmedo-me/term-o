import * as React from 'preact'

import { iconSizes } from '@src/constants/icon.constants'

import { buttonIconWrapper, buttonWrapper } from './Button.module.scss'

export const Button = ({
  value,
  onClick,
  variant,
  Icon = null,
  fullWidth = false,
  selected = false
}) => {
  return (
    <button
      className={buttonWrapper}
      onClick={onClick}
      data-full-width={fullWidth}
      data-selected={selected}
      data-variant={variant}
    >
      {Icon && (
        <span className={buttonIconWrapper}>
          <Icon size={iconSizes.SMALL} />
        </span>
      )}

      {value && <span>{value}</span>}
    </button>
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
