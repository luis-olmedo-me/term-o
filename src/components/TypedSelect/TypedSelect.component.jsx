import { useRef, useState } from 'preact/hooks'

import Input, { inputTypes, inputVariants } from '@src/components/Input'
import useDebouncedCallback from '@src/hooks/useDebouncedCallback'
import useObservedState from '@src/hooks/useObservedState'

import { global__loader, global__scrollable } from '@styles/global.module.scss'
import {
  typed_select,
  typed_select___state_loading,
  typed_select__input___state_loading,
  typed_select__input___state_open,
  typed_select__option,
  typed_select__option___state_selected,
  typed_select__options,
  typed_select__options_container,
  typed_select__options_container___open
} from './TypedSelect.module.scss'

export const TypedSelect = ({
  options,
  value,
  onChange,
  name,
  loading = false,
  OptionPrefixComponent = null
}) => {
  const [open, setOpen] = useState(false)
  const [localValue, setLocalValue, resetLocalValue] = useObservedState(value, [value])
  const [optionsFiltered, setOptionsFiltered] = useObservedState(options, [options])

  const selecterRef = useRef(null)

  const applyFilter = useDebouncedCallback(
    (value, options) => {
      const valueLowerCased = value.toLowerCase()
      const newOptions = options.filter(({ name }) => name.toLowerCase().includes(valueLowerCased))

      setOptionsFiltered(newOptions)
    },
    [],
    200
  )

  const handleOnChange = event => {
    const newValue = event.target.value

    setLocalValue(newValue)
    applyFilter(newValue, options)
  }

  const handleOnFocus = () => {
    applyFilter(localValue, options)
    setOpen(true)
  }

  const handleOnBlur = () => {
    resetLocalValue()
    setOpen(false)
  }

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
        ${typed_select}
        ${loading ? typed_select___state_loading : ''}
        ${loading ? global__loader : ''}
      `}
    >
      <Input
        name={name}
        value={localValue}
        variant={inputVariants.OUTLINED}
        type={inputTypes.TEXT}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputClassName={`
          ${open ? typed_select__input___state_open : ''}
          ${loading ? typed_select__input___state_loading : ''}
        `}
      />

      <div
        className={`
          ${typed_select__options_container}
          ${open ? typed_select__options_container___open : ''}
        `}
      >
        <ul
          role="listbox"
          id={listboxId}
          aria-activedescendant={selectedOption ? `option-${selectedOption.id}` : null}
          tabIndex={-1}
          className={`
            ${global__scrollable}
            ${typed_select__options}
          `}
        >
          {optionsFiltered.map(option => {
            const isSelected = option.id === value

            return (
              <li
                key={option.id}
                id={`option-${option.id}`}
                role="option"
                aria-selected={option.id === value}
                onClick={() => handleOptionClick(option.id)}
                className={`
                    ${typed_select__option}
                    ${isSelected ? typed_select__option___state_selected : ''}
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

TypedSelect.propTypes = {
  options: Array,
  value: String,
  name: String,
  onChange: Function,
  loading: Boolean,
  OptionPrefixComponent: Object
}
