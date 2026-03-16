import { inputTypes } from './Input.constants'
import {
  input,
  input___mod_disabled,
  input___type_number,
  input__postfix,
  input__real_input,
  input__real_input___type_number
} from './Input.module.scss'

export const Input = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  value,
  inputRef,
  disabled,
  type,
  postFix,
  name,
  variant,
  className
}) => {
  const isNumberInput = type === inputTypes.NUMBER

  return (
    <div
      className={`
        ${input}
        ${disabled ? input___mod_disabled : ''}
        ${isNumberInput ? input___type_number : ''}
        ${className}
      `}
    >
      <input
        ref={inputRef}
        name={name}
        spellCheck="false"
        type={type}
        value={value}
        onInput={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        data-variant={variant}
        className={`
          ${input__real_input}
          ${isNumberInput ? input__real_input___type_number : ''}
        `}
      />

      {postFix && <span className={input__postfix}>{postFix}</span>}
    </div>
  )
}

Input.propTypes = {
  onChange: Function,
  onKeyDown: Function,
  onFocus: Function,
  onBlur: Function,
  placeholder: String,
  value: String,
  postFix: String,
  inputRef: Object,
  disabled: Boolean,
  type: String,
  name: String,
  variant: String,
  className: String
}
