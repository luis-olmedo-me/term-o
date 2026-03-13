import { useState } from 'preact/hooks'

import { global__scrollable } from '@styles/global.module.scss'
import {
  selecter___state_loading,
  selecter__button,
  selecter__button___state_loading,
  selecter__option,
  selecter__option___state_selected,
  selecter__options
} from './Select.module.scss'

export const Select = ({
  options,
  value,
  onChange,
  name,
  loading = false,
  OptionPrefixComponent = null
}) => {
  const [open, setOpen] = useState(false)

  const selected = options.find(option => option.id === value)

  const handleOptionClick = selectedIdItem => {
    onChange(selectedIdItem)
    setOpen(false)
  }

  return (
    <div
      data-loading={loading}
      className={`
        ${loading ? selecter___state_loading : ''}
      `}
    >
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(isOpen => !isOpen)}
        disabled={loading}
        className={`
          ${selecter__button}
          ${loading ? selecter__button___state_loading : ''}
        `}
      >
        {OptionPrefixComponent && <OptionPrefixComponent option={selected} />}

        {loading ? 'Loading' : selected?.name}
      </button>

      {open && (
        <ul
          role="listbox"
          className={`
            ${global__scrollable}
            ${selecter__options}
          `}
        >
          {options.map(option => {
            const isSelected = option.id === value

            return (
              <li
                key={option.id}
                role="option"
                aria-selected={option.id === value}
                onClick={() => handleOptionClick(option.id)}
                className={`
                  ${selecter__option}
                  ${isSelected ? selecter__option___state_selected : ''}
                `}
              >
                {OptionPrefixComponent && <OptionPrefixComponent option={option} />}

                {option.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

Select.propTypes = {
  options: Array,
  value: String,
  name: String,
  onChange: Function,
  loading: Boolean,
  OptionPrefixComponent: Object
}
