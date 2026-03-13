import { useState } from 'preact/hooks'

import { verticalScroller } from '@styles/global.module.scss'
import { optionItem, optionsWrapper, selectButton, selecterWrapper } from './Select.module.scss'

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

  return (
    <div className={selecterWrapper} data-loading={loading}>
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(isOpen => !isOpen)}
        className={selectButton}
        disabled={loading}
      >
        {OptionPrefixComponent && <OptionPrefixComponent option={selected} />}

        {selected?.name}
      </button>

      {open && (
        <ul role="listbox" className={`${optionsWrapper} ${verticalScroller}`}>
          {options.map(option => (
            <li
              key={option.id}
              role="option"
              aria-selected={option.id === value}
              className={optionItem}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              {OptionPrefixComponent && <OptionPrefixComponent option={option} />}

              {option.name}
            </li>
          ))}
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
