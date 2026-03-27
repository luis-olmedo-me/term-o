import { iconSizes } from '@src/constants/icon.constants'
import { getClassNameByVariant } from './Button.helpers'
import { button, button___state_selected } from './Button.module.scss'

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
      className={`
        ${button}
        ${selected ? button___state_selected : ''}
        ${getClassNameByVariant(variant)}
        ${className}
      `}
    >
      {Icon && <Icon size={iconSizes.SMALL} />}

      {value && <span>{value}</span>}
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
