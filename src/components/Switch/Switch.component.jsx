import {
  switcher,
  switcher__fake_input,
  switcher__fake_input___mod_selected,
  switcher__input
} from './Switch.module.scss'

export const Switch = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  value,
  inputRef,
  disabled,
  name
}) => {
  return (
    <div className={switcher}>
      <input
        className={switcher__input}
        name={name}
        ref={inputRef}
        checked={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        type="checkbox"
      />

      <div
        className={`
          ${switcher__fake_input}
          ${value ? switcher__fake_input___mod_selected : ''}
        `}
      />
    </div>
  )
}

Switch.propTypes = {
  onChange: Function,
  onKeyDown: Function,
  onFocus: Function,
  onBlur: Function,
  value: Boolean,
  checked: Boolean,
  inputRef: Object,
  disabled: Boolean,
  type: String,
  name: String
}
