import { useEffect, useRef, useState } from 'preact/hooks'

import Chevron from '@src/icons/Chevron.icon'

import { iconSizes } from '@src/constants/icon.constants'
import { global__loader, global__scrollable } from '@styles/global.module.scss'
import {
  select,
  select___state_loading,
  select__button,
  select__button___state_loading,
  select__button___state_open,
  select__label,
  select__mark,
  select__mark___state_open,
  select__option,
  select__option___state_selected,
  select__options,
  select__options_container,
  select__options_container___open
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
      className={`
        ${select}
        ${loading ? select___state_loading : ''}
        ${loading ? global__loader : ''}
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
          ${select__button}
          ${open ? select__button___state_open : ''}
          ${loading ? select__button___state_loading : ''}
        `}
      >
        <span className={select__label}>
          {OptionPrefixComponent && <OptionPrefixComponent option={selectedOption} />}

          {loading ? 'Loading' : selectedOption?.name}
        </span>

        <Chevron
          size={iconSizes.EXTRA_SMALL}
          className={`
            ${select__mark}
            ${open ? select__mark___state_open : ''}
          `}
        />
      </button>

      <div
        className={`
          ${select__options_container}
          ${open ? select__options_container___open : ''}
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
