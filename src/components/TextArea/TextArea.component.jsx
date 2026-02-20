import { textAreaInput } from './TextArea.module.scss'

export const TextArea = ({ onChange, onBlur, value, name, maxLines, disabled = false }) => {
  return (
    <textarea
      className={textAreaInput}
      name={name}
      disabled={disabled}
      onBlur={onBlur}
      onInput={onChange}
      rows={maxLines}
      value={value}
      spellCheck="false"
    />
  )
}

TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  disabled: Boolean,
  maxLines: Number,
  name: String
}
