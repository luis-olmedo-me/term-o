import { useState } from 'preact/hooks'

import { iconSizes } from '@src/constants/icon.constants'
import { global__scrollable } from '@styles/global.module.scss'
import {
  dropdown,
  dropdown__button,
  dropdown__options_container,
  dropdown__options_container___open,
  select__option,
  select__option___state_selected,
  select__options
} from './Dropdown.module.scss'

export const Dropdown = ({ value, onSelect, name, options, Icon = null, className = '' }) => {
  const [open, setOpen] = useState(false)

  const handleOptionClick = selectedIdItem => {
    onSelect({ value: selectedIdItem })
    setOpen(false)
  }

  const selectedOption = options.find(option => option.id === value)
  const listboxId = `dropdown-options-${name}`

  return (
    <div className={`${dropdown} ${className}`}>
      <button className={dropdown__button} onClick={() => setOpen(isOpen => !isOpen)}>
        {Icon && <Icon size={iconSizes.SMALL} />}

        {value && <span>{value}</span>}
      </button>

      <div
        className={`
        ${dropdown__options_container}
        ${open ? dropdown__options_container___open : ''}
      `}
      >
        <ul
          role="listbox"
          id={listboxId}
          aria-activedescendant={selectedOption ? `option-${selectedOption.id}` : null}
          className={`
              ${global__scrollable}
              ${select__options}
            `}
          tabIndex={-1}
        >
          {options.map(option => {
            const isSelected = option.id === value

            return (
              <li
                key={option.id}
                id={`option-${option.id}`}
                role="option"
                aria-selected={option.id === value}
                onClick={() => handleOptionClick(option.id)}
                className={`
                    ${select__option}
                    ${isSelected ? select__option___state_selected : ''}
                  `}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  value: String,
  onSelect: Function,
  Icon: Object,
  className: String,
  name: String,
  options: Array
}
