import { input, input__postfix, input__real_input } from './Input.module.scss'

export const Input = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  value,
  prefix,
  inputRef,
  disabled,
  type,
  postFix,
  name,
  variant,
  className
}) => {
  return (
    <div className={`${input} ${className}`} data-disabled={disabled}>
      {prefix && <span>{prefix}</span>}

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
  prefix: String,
  postFix: String,
  inputRef: Object,
  disabled: Boolean,
  type: String,
  name: String,
  variant: String,
  className: String
}
