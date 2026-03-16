import { input, input___mod_disabled, input__postfix, input__real_input } from './Input.module.scss'

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
  return (
    <div
      className={`
        ${input}
        ${disabled ? input___mod_disabled : ''}
        ${className}
      `}
    >
      <input
        className={input__real_input}
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
