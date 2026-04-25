import { iconSizes } from '@src/constants/icon.constants'
import { buttonIconOrientations, buttonSizes } from './Button.constants'
import { getClassNameBySize, getClassNameByVariant } from './Button.helpers'
import { button, button___state_selected } from './Button.module.scss'

export const Button = ({
  value,
  onClick,
  variant,
  size = buttonSizes.NORMAL,
  Icon = null,
  selected = false,
  className = '',
  iconOrientation = buttonIconOrientations.LEFT
}) => {
  const isIconOnLeft = iconOrientation === buttonIconOrientations.LEFT

  return (
    <button
      onClick={onClick}
      className={`
        ${button}
        ${selected ? button___state_selected : ''}
        ${getClassNameByVariant(variant)}
        ${getClassNameBySize(size)}
        ${className}
      `}
    >
      {isIconOnLeft && Icon && <Icon size={iconSizes.SM} />}

      {value && <span>{value}</span>}

      {!isIconOnLeft && Icon && <Icon size={iconSizes.SM} />}
    </button>
  )
}

Button.propTypes = {
  value: String,
  onClick: Function,
  selected: Boolean,
  Icon: Object,
  variant: String,
  className: String,
  iconOrientation: String,
  size: String
}
