import { iconSizes } from '@src/constants/icon.constants'
import { getClassNameByVariant } from './Button.helpers'
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
      onClick={onClick}
      data-selected={selected}
      className={`
        ${button}
        ${getClassNameByVariant(variant)}
        ${className}
      `}
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
