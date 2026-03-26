import { iconSizes } from '@src/constants/icon.constants'
import { dropdown } from './Dropdown.module.scss'

export const Dropdown = ({ value, onClick, Icon = null, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${dropdown}
        ${className}
      `}
    >
      {Icon && <Icon size={iconSizes.SMALL} />}

      {value && <span>{value}</span>}
    </button>
  )
}

Dropdown.propTypes = {
  value: String,
  onClick: Function,
  Icon: Object,
  className: String
}
