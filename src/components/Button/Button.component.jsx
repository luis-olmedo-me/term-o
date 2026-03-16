import { iconSizes } from '@src/constants/icon.constants'
import { button, button__label } from './Button.module.scss'

export const Button = ({
  value,
  onClick,
  variant,
  Icon = null,
  selected = false,
  className = ''
}) => {
  return (
    <button
      className={`${button} ${className}`}
      onClick={onClick}
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
  selected: Boolean,
  Icon: Object,
  variant: String,
  className: String
}
