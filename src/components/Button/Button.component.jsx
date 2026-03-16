import { iconSizes } from '@src/constants/icon.constants'
import { button, button__label } from './Button.module.scss'

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
      className={button}
      onClick={onClick}
      data-full-width={fullWidth}
      data-selected={selected}
      data-variant={variant}
    >
      {Icon && <Icon size={iconSizes.SMALL} />}

      {value && <span className={button__label}>{value}</span>}
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
