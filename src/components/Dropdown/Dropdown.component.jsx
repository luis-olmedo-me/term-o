import { useEffect, useRef, useState } from 'preact/hooks'

import { iconSizes } from '@src/constants/icon.constants'
import { global__scrollable } from '@styles/global.module.scss'
import {
  dropdown,
  dropdown__button,
  dropdown__button___mod_open,
  dropdown__options_container,
  dropdown__options_container___open,
  select__option,
  select__options
} from './Dropdown.module.scss'

export const Dropdown = ({
  value,
  onSelect,
  name,
  options,
  Icon = null,
  className = '',
  buttonClassName = '',
  optionsClassName = ''
}) => {
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(
    function handleOutsideInteraction() {
      if (!open) return
      const handleGlobalClick = event => {
        const isOutside = !dropdownRef.current.contains(event.target)

        if (isOutside) setOpen(false)
      }
      const handleGlobalBlur = () => setOpen(false)

      window.addEventListener('click', handleGlobalClick)
      window.addEventListener('blur', handleGlobalBlur)

      return () => {
        window.removeEventListener('click', handleGlobalClick)
        window.removeEventListener('blur', handleGlobalBlur)
      }
    },
    [open]
  )

  const handleOptionClick = selectedIdItem => {
    onSelect({ value: selectedIdItem })
    setOpen(false)
  }

  const selectedOption = options.find(option => option.id === value)
  const listboxId = `dropdown-options-${name}`

  return (
    <div ref={dropdownRef} className={`${dropdown} ${className}`}>
      <button
        onClick={() => setOpen(isOpen => !isOpen)}
        className={`
          ${dropdown__button}
          ${open ? dropdown__button___mod_open : ''}
          ${buttonClassName}
        `}
      >
        {Icon && <Icon size={iconSizes.SMALL} />}

        {value && <span>{value}</span>}
      </button>

      <div
        className={`
          ${dropdown__options_container}
          ${open ? dropdown__options_container___open : ''}
          ${optionsClassName}
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
            return (
              <li
                key={option.id}
                id={`option-${option.id}`}
                role="option"
                aria-selected={option.id === value}
                onClick={() => handleOptionClick(option.id)}
                className={select__option}
              >
                {option.Icon && <option.Icon size={iconSizes.HALF_SMALL} />}

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
  buttonClassName: String,
  optionsClassName: String,
  name: String,
  options: Array
}
