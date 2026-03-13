import { useEffect, useRef, useState } from 'preact/hooks'

import { global__scrollable } from '@styles/global.module.scss'
import {
  selecter,
  selecter___state_loading,
  selecter__button,
  selecter__button___state_loading,
  selecter__button___state_open,
  selecter__option,
  selecter__option___state_selected,
  selecter__options,
  selecter__options_container,
  selecter__options_container___open
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

  const selecterRef = useRef(null)

  useEffect(
    function handleClickOutside() {
      if (!open) return
      const handleGlobalClick = event => {
        const isOutside = !selecterRef.current.contains(event.target)

        if (isOutside) setOpen(false)
      }

      window.addEventListener('click', handleGlobalClick)

      return () => window.removeEventListener('click', handleGlobalClick)
    },
    [open]
  )

  const handleOptionClick = selectedIdItem => {
    onChange({ value: selectedIdItem })
    setOpen(false)
  }

  const selectedOption = options.find(option => option.id === value)
  const listboxId = `select-options-${name}`

  return (
    <div
      ref={selecterRef}
      data-loading={loading}
      className={`
        ${selecter}
        ${loading ? selecter___state_loading : ''}
      `}
    >
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen(isOpen => !isOpen)}
        disabled={loading}
        className={`
          ${selecter__button}
          ${open ? selecter__button___state_open : ''}
          ${loading ? selecter__button___state_loading : ''}
        `}
      >
        {OptionPrefixComponent && <OptionPrefixComponent option={selectedOption} />}

        {loading ? 'Loading' : selectedOption?.name}
      </button>

      <div
        className={`
          ${selecter__options_container}
          ${open ? selecter__options_container___open : ''}
        `}
      >
        <ul
          role="listbox"
          id={listboxId}
          aria-activedescendant={selectedOption ? `option-${selectedOption.id}` : null}
          className={`
              ${global__scrollable}
              ${selecter__options}
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
      </div>
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
