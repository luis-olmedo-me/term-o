import { inputWrapper, postfix, realInput } from './Input.module.scss'

export const Input = ({
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  value,
  checked,
  prefix,
  inputRef,
  disabled,
  type,
  postFix,
  name,
  variant,
  fullWidth,
  className
}) => {
  return (
    <div
      className={`${inputWrapper} ${className}`}
      data-disabled={disabled}
      data-fit-content={!fullWidth}
    >
      {prefix && <span>{prefix}</span>}

      <input
        className={realInput}
        ref={inputRef}
        name={name}
        spellCheck="false"
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        data-variant={variant}
      />

      {postFix && <span className={postfix}>{postFix}</span>}
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
  checked: Boolean,
  prefix: String,
  postFix: String,
  inputRef: Object,
  disabled: Boolean,
  type: String,
  name: String,
  variant: String,
  fullWidth: Boolean,
  className: String
}
