import { selected, simulatedSwitch, switchInput, switchWrapper } from './Switch.module.scss'

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
    <div className={switchWrapper}>
      <input
        className={switchInput}
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

      <div className={`${simulatedSwitch} ${value ? selected : null}`} />
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
